import { Color } from "..";
import { CIELab } from "../colorTypes";
import { round } from "../utils/index";

export const cie76 = (color1: Color, color2: Color): number => {
  const lab1: CIELab = color1.lab();
  const lab2: CIELab = color2.lab();
  return round(Math.sqrt(
    Math.pow(Math.abs(lab1.l - lab2.l), 2) +
    Math.pow(Math.abs(lab1.a - lab2.a), 2) +
    Math.pow(Math.abs(lab1.b - lab2.b), 2)
  ), 2);
};

export const cie94 = (color1: Color, color2: Color): number => {
  const lab1 = color1.lab();
  const lab2 = color2.lab();
  const C1 = Math.sqrt(Math.pow(lab1.a, 2) + Math.pow(lab1.b, 2));
  const C2 = Math.sqrt(Math.pow(lab2.a, 2) + Math.pow(lab2.b, 2));
  const _L = Math.abs(lab1.l - lab2.l);
  const _a = Math.abs(lab1.a - lab2.a);
  const _b = Math.abs(lab1.b - lab2.b);
  const _C = Math.abs(C1 - C2);
  let _H = Math.sqrt(Math.pow(_a, 2) + Math.pow(_b, 2) - Math.pow(_C, 2));
  _H = isNaN(_H) ? 0 : _H;
  const Sc = 1 + (0.045 * C1);
  const Sh = 1 + (0.015 * C1);
  return round(Math.sqrt(
    Math.pow(_L / 1, 2) +
    Math.pow(_C / (1 * Sc), 2) +
    Math.pow(_H / (1 * Sh), 2)
  ), 2);
};

export const cie2000 = (color1: Color, color2: Color): number => {
  const lab1 = color1.lab();
  const lab2 = color2.lab();
  const $L = (lab1.l + lab2.l) / 2;
  const C1 = Math.sqrt(Math.pow(lab1.a, 2) + Math.pow(lab1.b, 2));
  const C2 = Math.sqrt(Math.pow(lab2.a, 2) + Math.pow(lab2.b, 2));
  const C = (C1 + C2) / 2;
  const G = (1 - Math.sqrt(Math.pow(C, 7) / (Math.pow(C, 7) + Math.pow(25, 7)))) * 0.5;
  const $a1 = lab1.a * (1 + G);
  const $a2 = lab2.a * (1 + G);
  const $C1 = Math.sqrt(Math.pow($a1, 2) + Math.pow(lab1.b, 2));
  const $C2 = Math.sqrt(Math.pow($a2, 2) + Math.pow(lab2.b, 2));
  const $C = ($C1 + $C2) / 2;
  const $h1 = Math.atan2(lab1.b, $a1) >=0 ? Math.atan2(lab1.b, $a1) : Math.atan2(lab1.b, $a1) + 360;
  const $h2 = Math.atan2(lab2.b, $a2) >=0 ? Math.atan2(lab2.b, $a2) : Math.atan2(lab2.b, $a2) + 360;
  const $H = Math.abs($h1 - $h2) > 180 ? ($h1 + $h2 + 360) / 2 : ($h1 + $h2) / 2;
  const T = 1 - 0.17 * Math.cos($H - 30) + 0.24 * Math.cos(2 * $H) + 0.32 * Math.cos(3 * $H + 6) - 0.20 * Math.cos(4 * $H - 63);
  let _$h = $h2 - $h1 - 360;
  if(Math.abs($h2 - $h1) <= 180) {
    _$h = $h2 - $h1;
  } else if(Math.abs($h2 - $h1) > 180 && $h2 <= $h1) {
    _$h = $h2 - $h1 + 360;
  }
  const _$L = lab2.l - lab1.l;
  const _$C = $C2 - $C1;
  const _$H = 2 * Math.sqrt($C1 * $C2) * Math.sin(_$h / 2);
  const Sl = 1 + 0.015 * Math.pow($L - 50, 2) / Math.sqrt(20 + Math.pow($L - 50, 2));
  const Sc = 1 + 0.045 * $C;
  const Sh = 1 + 0.015 * $C * T;
  const _E = 30 * Math.exp(-Math.pow(($H - 275) / 25, 2));
  const Rc = 2 * Math.sqrt(Math.pow($C, 7) / (Math.pow($C, 7) + Math.pow(25, 7)));
  const Rt = -(Rc * Math.sin(2 * _E));
  const Kl = 1;
  const Kc = 1;
  const Kh = 1;
  return round(Math.sqrt(
    Math.pow(_$L / (Kl * Sl), 2) +
    Math.pow(_$C / (Kc * Sc), 2) +
    Math.pow(_$H / (Kh * Sh), 2) +
    Rt * (_$C / (Kc * Sc)) * (_$H / (Kh * Sh))
  ), 2);
};
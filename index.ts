const ctrlC: string = "[CTRL+C]";
const ctrlX: string = "[CTRL+X]";
const ctrlV: string = "[CTRL+V]";
const ctrlCReg: RegExp = /.+(?=\[CTRL\+C\])/g;
const ctrlXReg: RegExp = /.+(?=\[CTRL\+X\])/g;

export default function challenge(input: string): string {
  const copyString = (
    command: string,
    reg: RegExp
  ): RegExpMatchArray | null => {
    return input.includes(command) && input ? input.match(reg) : null;
  };
  const preC: string | null = copyString(ctrlC, ctrlCReg)
    ? copyString(ctrlC, ctrlCReg)![0]
    : null;

  const preX: string | null = copyString(ctrlX, ctrlXReg)
    ? copyString(ctrlX, ctrlXReg)![0]
    : null;

  const findFirstOccurrence = (command: string): boolean =>
    input.indexOf(ctrlV) < input.indexOf(command);
  const isCSecond: boolean = findFirstOccurrence(ctrlC);
  const isXSecond: boolean = findFirstOccurrence(ctrlX);
  const preXToDelete: string | null = isXSecond ? "" : preX;
  const toPaste: string = preC ? preC : preX ? preX : "";

  const count = (regex: RegExp) => (input.match(regex) || []).length;
  const countCtrlV = count(/\[CTRL\+V\]/g);
  const countCtrlX = count(/\[CTRL\+X\]/g);
  const countCtrlC = count(/\[CTRL\+C\]/g);

  const replaced: string = input
    .replace(
      ctrlV,
      (!preX && countCtrlX > 0) || (!preC && countCtrlC > 0) ? "" : ctrlV
    )
    .replace(ctrlC, "")
    .replace(ctrlX, "")
    .replace(preXToDelete ? preXToDelete : "", "")
    .replace(
      ctrlV,
      (isCSecond && countCtrlV < 2) || (isXSecond && countCtrlV < 2)
        ? ""
        : toPaste
    )
    .replace("  ", " ")
    .replace(ctrlV, "")
    .replace(ctrlX, "")
    .trim();
  return replaced;
}

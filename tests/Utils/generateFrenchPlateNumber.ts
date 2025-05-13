export function generateFrenchPlateNumber(): string {
  const letters = () =>
    String.fromCharCode(65 + Math.floor(Math.random() * 26));
  const digits = () => Math.floor(100 + Math.random() * 900); // 3 digits from 100 to 999
  return `${letters()}${letters()}-${digits()}-${letters()}${letters()}`;
}

export function calculateDeathDate(birthDate: string, minAge: number, maxAge: number): string {
  const birth = new Date(birthDate);
  const age = Math.floor(Math.random() * (maxAge - minAge + 1)) + minAge;
  const death = new Date(birth);
  death.setFullYear(birth.getFullYear() + age);
  const yyyy = death.getFullYear();
  const mm = String(death.getMonth() + 1).padStart(2, "0");
  const dd = String(death.getDate()).padStart(2, "0");
  return `${yyyy}-${mm}-${dd}`;
}

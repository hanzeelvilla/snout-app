export function calcularEdad(fechaNacimiento) {
  // fechaNacimiento en formato "DD/MM/AAAA"
  const [dia, mes, año] = fechaNacimiento.split("/").map(Number);
  const hoy = new Date();
  const nacimiento = new Date(año, mes - 1, dia);

  let edad = hoy.getFullYear() - nacimiento.getFullYear();
  const m = hoy.getMonth() - nacimiento.getMonth();
  if (m < 0 || (m === 0 && hoy.getDate() < nacimiento.getDate())) {
    edad--;
  }
  return edad;
}

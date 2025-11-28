export async function buscarCep(cep) {
  const limpaCEP = cep.replace(/\D/g, ""); // remove traços e pontos

  if (limpaCEP.length !== 8) return null;

  const resposta = await fetch(`https://viacep.com.br/ws/${limpaCEP}/json/`);

  const dados = await resposta.json();

  if (dados.erro) return null;

  return dados;
}

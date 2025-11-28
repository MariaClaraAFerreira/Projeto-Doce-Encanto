// src/components/Whatsapp.jsx

export default function Whatsapp({
  phone = "5535991087672", // coloque o número da confeiteira
  pedidoId = null, // opcional: para mandar o ID do pedido
}) {
  const mensagemBase = "Você tem um novo pedido!";
  const mensagem = pedidoId
    ? `${mensagemBase}%20ID:%20${pedidoId}`
    : mensagemBase;

  const link = `https://wa.me/${phone}?text=${mensagem}`;

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#25D366] text-white hover:scale-105 transition-transform duration-300"
      title="Enviar pedido pelo WhatsApp"
    >
      <svg
        className="w-6 h-6"
        fill="currentColor"
        viewBox="0 0 24 24"
        aria-hidden="true"
      >
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.472-.148-.672.15-.198.297-.77.967-.944 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.372-.025-.521-.075-.148-.672-1.612-.922-2.21-.242-.579-.487-.5-.672-.51-.173-.008-.372-.01-.571-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.095 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.719 2.006-1.412.248-.694.248-1.29.173-1.412-.74-.123-.272-.198-.57-.347zM12.003 2C6.478 2 2 6.477 2 12c0 1.993.521 3.853 1.43 5.477L2 22l4.66-1.43A9.958 9.958 0 0012.003 22C17.523 22 22 17.523 22 12c0-5.523-4.477-10-9.997-10z" />
      </svg>
    </a>
  );
}

import FinalizarPedido from "./componentes/tabela";
import Footer from "../componentes/footer";
import Header from "../componentes/header";

export default function Home() {
  return (
    <div className="h-full   w-full   bg-[#CDECF9] flex-col justify-center items-center ">
      <div className=" ">
        <Header />
      </div>

      <div className="mt-20">
        <FinalizarPedido />
      </div>

      <div>
        <Footer />
      </div>
    </div>
  );
}

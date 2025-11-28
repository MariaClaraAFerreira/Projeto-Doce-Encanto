"use client";

import { useEffect } from "react";
import { createRoot } from "react-dom/client";

// === Estilos do Toast (injetados automaticamente) ===
const toastStyles = `
@keyframes toast-slide-in {
  from { transform: translateY(20px); opacity: 0; }
  to { transform: translateY(0); opacity: 1; }
}
@keyframes toast-slide-out {
  from { transform: translateY(0); opacity: 1; }
  to { transform: translateY(20px); opacity: 0; }
}
.toast-container {
  position: fixed;
  bottom: 30px;
  right: 30px;
  z-index: 999999;
  display: flex;
  align-items: center;
  gap: 12px;
  background: #ff66aa;
  color: white;
  padding: 14px 22px;
  border-radius: 12px;
  font-size: 15px;
  font-weight: 600;
  box-shadow: 0 6px 20px rgba(255, 0, 100, 0.35);
  animation: toast-slide-in 0.35s ease-out forwards;
}
.toast-container.hide {
  animation: toast-slide-out 0.35s ease-in forwards;
}
.toast-icon {
  font-size: 22px;
}
`;

// Insere o CSS no documento
function injectToastCSS() {
  if (!document.getElementById("toast-css")) {
    const style = document.createElement("style");
    style.id = "toast-css";
    style.innerHTML = toastStyles;
    document.head.appendChild(style);
  }
}

// Renderiza o toast
export function showOrderSentToast(
  message = "Seu pedido foi enviado para a confeiteira! 🎀"
) {
  injectToastCSS();

  // Cria o container principal
  const div = document.createElement("div");
  div.className = "toast-container";

  // Conteúdo com ícone ✨
  div.innerHTML = `
    <span class="toast-icon">🎀</span>
    <span>${message}</span>
  `;

  document.body.appendChild(div);

  // Remove automaticamente depois de 4s com animação
  setTimeout(() => {
    div.classList.add("hide");
    setTimeout(() => div.remove(), 350);
  }, 3000);
}

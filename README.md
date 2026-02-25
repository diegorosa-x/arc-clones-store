# 🏗️ Arquitetura de Sistema: E-Commerce High-End

Documentação técnica do fluxo de venda, estoque e pagamento. Sistema desenhado para suportar tráfego pago escalável com segurança total contra fraudes de preço e estoque.

---

## 🛠️ Stack Tecnológica
* **Front-end:** Vercel (Next.js/React)
* **Backend:** Koyeb (NestJS)
* **Banco de Dados/Storage:** Supabase
* **Infra:** Koyeb (Auto-scaling API)

---

## 📐 Responsabilidades por Camada

### 1. Front-end (Vercel)
* **Função:** Catálogo, PDP, Carrinho e Interface de Checkout.
* **Segurança:** * **PROIBIDO** o uso da `SUPABASE_SERVICE_ROLE_KEY`.
    * Leitura de produtos via Supabase Client (respeitando RLS).
    * Toda ação de escrita ou pagamento é delegada para o Backend no Koyeb.

### 2. Backend (Koyeb / NestJS)
* **Função:** Único orquestrador de lógica de negócio.
* **Segurança:** * Detentor exclusivo da `SUPABASE_SERVICE_ROLE_KEY`.
    * Responsável por assinar/validar requisições do agente.
    * Valida assinaturas de Webhooks de pagamento.
* **Ações:** Criação de pedidos, reserva de estoque e geração de cobrança Pix.

### 3. Supabase (Database & Storage)
* **Tabelas:** `products`, `stock`, `orders`, `order_items`, `payments`, `customers`.
* **Storage:** Bucket para mídia de alta fidelidade (fotos/vídeos dos clones).
* **RLS (Row Level Security):**
    * **Público:** Acesso de leitura (Select) permitido.
    * **Backend:** Escrita permitida apenas via `service_role` (Server-to-Server).

---

## 💳 Fluxo de Compra (Checkout Confiável)

O pagamento só muda de status via **Webhook**, eliminando brechas de segurança no cliente.

### 1. Solicitação de Checkout
* **Front-end** ➔ `POST /checkout` (Koyeb)
    * Payload: Itens do carrinho + Dados do cliente (Nome, WhatsApp, Endereço).

### 2. Processamento (NestJS)
* **Validação:** Verifica preços e SKUs diretamente no DB.
* **Persistência:** Cria a `order` e os `order_items`.
* **Reserva:** Diminui o estoque disponível com **TTL (Time-To-Live)** de 20–30 min.
* **Pagamento:** Cria cobrança Pix no provedor e grava `payment` com `status=waiting`.
* **Resposta:** Retorna para o front `{ qr_code, copia_e_cola, expires_at, order_id }`.

### 3. Finalização
* **Front-end:** Exibe o QR Code, botão "Copia e Cola" e o timer de contagem regressiva.

---

## 📡 Conciliação Automática (Webhooks)

Para evitar "gambiarra" e garantir que o pedido só seja processado após o dinheiro cair:

1. **Webhook Provedor** ➔ `POST /webhooks/pix` (Koyeb)
2. **Backend:** Valida a assinatura do webhook para garantir que veio do banco.
3. **Backend:** Marca `payment=paid` e `order=paid`.
4. **Backend:** Confirma a baixa de estoque (converte reserva temporária em baixa definitiva).
5. **(Opcional) Front-end:** Realiza polling em `GET /orders/:id/status` para exibir tela de sucesso.

---

## 📊 Estrutura de Tabelas

* **products:** Cadastro de modelos (Rolex, AP, Patek).
* **stock:** Saldo real e saldo reservado.
* **orders:** Cabeçalho do pedido (status, total, cliente).
* **order_items:** Snapshot de preço e quantidade no momento da compra.
* **payments:** Registro da transação Pix e log do provedor.
* **customers:** Dados de contato e endereço.

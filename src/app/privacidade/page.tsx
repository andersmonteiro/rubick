import type { Metadata } from "next";
import { SITE_NAME } from "@/lib/site";

export const metadata: Metadata = {
  title: "Política de Privacidade",
  description: `Como o ${SITE_NAME} lida com dados dos visitantes.`,
  alternates: { canonical: "/privacidade" },
};

export default function PrivacidadePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <div className="mb-8 border-b border-border pb-4">
        <h1 className="font-display text-3xl font-bold uppercase tracking-wide sm:text-4xl">
          Política de Privacidade
        </h1>
      </div>

      <div className="prose prose-invert max-w-none prose-headings:font-display prose-headings:uppercase prose-headings:tracking-wide prose-a:text-accent">
        <p>
          Esta política explica, de forma direta, quais dados o{" "}
          <strong>{SITE_NAME}</strong> coleta e como eles são usados.
        </p>

        <h2>O que coletamos</h2>
        <ul>
          <li>
            <strong>Curtidas:</strong> ao clicar em &quot;Curtir&quot; numa
            matéria, geramos um identificador anônimo e aleatório, guardado
            apenas no seu navegador (localStorage), só para evitar curtidas
            duplicadas. Ele não contém nenhuma informação pessoal e não é
            usado para te identificar.
          </li>
          <li>
            <strong>Logs de hospedagem:</strong> como qualquer site, nosso
            provedor de hospedagem (Vercel) registra automaticamente dados
            técnicos de acesso (como endereço IP) por motivos de segurança e
            funcionamento — não temos acesso a isso além do necessário para
            operar o site.
          </li>
        </ul>

        <h2>O que não coletamos</h2>
        <p>
          Não temos cadastro de usuários, não pedimos e-mail, senha ou
          qualquer dado pessoal para navegar ou ler as matérias.
        </p>

        <h2>Conteúdo de terceiros</h2>
        <p>
          Algumas matérias incorporam vídeos do YouTube. Ao carregar um
          desses vídeos, o Google/YouTube pode definir seus próprios cookies,
          seguindo a política de privacidade deles — recomendamos consultar
          diretamente a{" "}
          <a
            href="https://policies.google.com/privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            política de privacidade do Google
          </a>
          .
        </p>

        <h2>Seus direitos</h2>
        <p>
          De acordo com a LGPD (Lei Geral de Proteção de Dados), você tem
          direito a solicitar informações sobre quaisquer dados que possamos
          ter relacionados a você. Como não coletamos dados pessoais
          identificáveis, não há perfil de usuário para consultar ou apagar.
        </p>

        <h2>Mudanças nesta política</h2>
        <p>
          Se no futuro passarmos a usar cookies de análise de tráfego ou
          publicidade, esta página será atualizada para refletir isso antes
          de qualquer mudança entrar em vigor.
        </p>
      </div>
    </div>
  );
}

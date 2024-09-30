import Link from 'next/link';

const HomePage = () => (
  <div className="container mx-auto mt-10">
    <h1 className="text-2xl font-bold mb-4 text-center">Bem-vindo à Gestão de Estudantes</h1>
    <p className="mb-4">
      Este projeto está sendo construído com base em uma ideia que tive para ajudar uma amiga. Ela está responsável por organizar pacotes para uma viagem universitária que ocorrerá no feriado do dia 15 de Novembro. Ela faz parte de uma atlética da Federal e, com o intuito de facilitar a vida daqueles que desejam participar do evento, organizou os pacotes disponibilizados pelo evento. A gestão que ela precisa fazer envolve desde a organização das pessoas que irão, até os pagamentos, contratos e controle dos tamanhos e peças dos kits que cada pessoa vai escolher, como chinelos e abadás.
    </p>
    <p className="mb-4">
      Para ajudar, criei um CRUD simples, utilizando Next.js no front-end e Apiato para a API, com o objetivo de estudar arquiteturas utilizadas aqui no Pequeno Príncipe. Sem muito conhecimento nessas tecnologias, baseei o sistema em documentações e contei com a ajuda do ChatGPT para desenvolver algumas funcionalidades.
    </p>
    <p className="mb-4">
      O sistema atualmente possui quatro abas: a aba inicial (onde você está agora), a aba de estudantes, que lista as pessoas que irão ao evento, a aba de pagamentos, que oferece uma visão sintética dos pagamentos, e a aba de parcelas, para aqueles que optaram pelo pagamento parcelado.
    </p>
    <p className="mb-4">
      O funcionamento do sistema é baseado no cadastro de estudantes. Para cadastrar um estudante, são necessárias as seguintes informações:
    </p>
    <ul className="list-disc list-inside">
      <li>Nome</li>
      <li>Email</li>
      <li>Celular</li>
      <li>Data de Nascimento</li>
      <li>CPF</li>
    </ul>
    <p className="mb-4 mt-4">
      Para cadastrar um pagamento, você deve selecionar um aluno previamente cadastrado e escolher uma forma de pagamento (cadastrada diretamente no banco de dados). O pagamento possui o valor total do pacote, e as parcelas são geradas automaticamente com base na forma de pagamento. As parcelas podem ser editadas para ter valores diferentes ou datas específicas.
    </p>
    <p className="mb-4">
      O sistema é simples, mas estou fazendo ajustes no front-end e pensando em melhorias futuras.
    </p>
    <Link className="text-blue-500" href="/students">
      Ir para Lista de Estudantes
    </Link>
  </div>
);

export default HomePage;

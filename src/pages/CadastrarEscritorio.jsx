import { useState } from "react";

export default function CadastrarEscritorio() {
  const [nome, setNome] = useState("");
  const [endereco, setEndereco] = useState("");
  const [cnpj, setCnpj] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ nome, endereco, cnpj });
    alert("Escritório cadastrado com sucesso!");
    setNome("");
    setEndereco("");
    setCnpj("");
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Cadastrar Escritório</h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded p-6 max-w-md"
      >
        <div className="mb-4">
          <label className="block text-gray-700">Nome</label>
          <input
            type="text"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">Email</label>
          <input
            type="email"
            value={endereco}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700">CNPJ</label>
          <input
            type="text"
            value={cnpj}
            onChange={(e) => setCnpj(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Salvar
        </button>
      </form>
    </div>
  );
}

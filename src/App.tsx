import { useState, FormEvent } from 'react';
import './App.css';
import logoImg from './assets/logo.png';

/**
 * Cálculo: álcool / gasolina
 * Se o resultado for menor que 0.7, compensa usar álcool.
 */

interface FuelInfo {
  title: string;
  gasolina: string;
  alcool: string;
}

function App() {
  const [gasolina, setGasolina] = useState<number>(0);
  const [alcool, setAlcool] = useState<number>(0);
  const [info, setInfo] = useState<FuelInfo | null>(null);

  function calcular(event: FormEvent) {
    event.preventDefault();
    
    if (gasolina === 0 || alcool === 0) return;

    const resultado = alcool / gasolina;

    setInfo({
      title: resultado <= 0.7 ? 'Compensa usar Álcool!' : 'Compensa usar Gasolina!',
      gasolina: formatarMoeda(gasolina),
      alcool: formatarMoeda(alcool),
    });
  }

  function formatarMoeda(valor: number): string {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  }

  return (
    <div>
      <main className="container">
        <img className="logo" src={logoImg} alt="Logo da calculadora de gasolina ou álcool" />
        <h1 className="title">Qual a melhor opção?</h1>

        <form className="form" onSubmit={calcular}>
          <label>Álcool (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4.90"
            min="0.01"
            step="0.01"
            required
            value={alcool}
            onChange={(e) => setAlcool(Number(e.target.value))}
          />

          <label>Gasolina (preço por litro):</label>
          <input
            className="input"
            type="number"
            placeholder="4.90"
            min="0.01"
            step="0.01"
            required
            value={gasolina}
            onChange={(e) => setGasolina(Number(e.target.value))}
          />

          <input className="button" type="submit" value="Calcular" />
        </form>

        {info && (
          <section className="result">
            <h2 className="result-title">{info.title}</h2>
            <span>Álcool: {info.alcool}</span>
            <span>Gasolina: {info.gasolina}</span>
          </section>
        )}
      </main>
    </div>
  );
}

export default App;

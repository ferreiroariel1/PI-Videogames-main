import React from 'react';
import style from './Paginado.module.css';

const Paginado = ({ maximo, pagina, setPagina }) => {
  const handleNextPage = () => {
    if (pagina < maximo) {
      setPagina(pagina + 1);
    }
  };

  const handlePreviousPage = () => {
    if (pagina > 1) {
      setPagina(pagina - 1);
    }
  };

  return (
    <div className={style.container}>
      <button
        onClick={handlePreviousPage}
        disabled={pagina === 1 || pagina < 1}
        className={pagina === 1 || pagina < 1 ? style.disabledButton : ''}
      >
        Anterior
      </button>
      <p className={style.paginasContainer}>{pagina} de {maximo}</p>
      <button
        onClick={handleNextPage}
        disabled={pagina === maximo || pagina > maximo}
      >
        Siguiente
      </button>
    </div>
  );
};

export default Paginado;

import React, { useState } from 'react';
import Button from './components/Button';
import './App.css';

const App: React.FC = () => {
  const [count, setCount] = useState(0);
  const [isPrimary, setIsPrimary] = useState(true);

  const handleIncrement = () => {
    setCount(count + 1);
  };

  const handleDecrement = () => {
    setCount(count - 1);
  };

  const toggleVariant = () => {
    setIsPrimary(!isPrimary);
  };

  return (
    <div className="app">
      <header className="app__header">
        <h1>Пример использования clsx</h1>
      </header>
      <main className="app__main">
        <div className="counter">
          <h2>Счетчик: {count}</h2>
          <div className="counter__buttons">
            <Button 
              variant={isPrimary ? 'primary' : 'secondary'}
              size="medium"
              onClick={handleIncrement}
            >
              Увеличить
            </Button>
            <Button 
              variant={isPrimary ? 'primary' : 'secondary'}
              size="medium"
              onClick={handleDecrement}
            >
              Уменьшить
            </Button>
          </div>
          <div className="counter__actions">
            <Button 
              variant="secondary"
              size="small"
              onClick={toggleVariant}
            >
              Переключить стиль кнопок
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
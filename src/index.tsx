import * as React from 'react';

import { createRoot } from 'react-dom/client';

import styles from './styles/styles.module.scss';

const container = document.getElementById('root');
const root = createRoot(container!);
root.render(<div className={styles.title}>React приложение работает </div>);

if (module.hot) {
  module.hot.accept();
}

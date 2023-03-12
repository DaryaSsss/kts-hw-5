import React from 'react';

import styles from './About.module.scss';

const About = () => {
  return (
    <div className={styles.page}>
      <div className={styles.content}>
        <div className={styles.header}>
          <h1 className={styles.header__title}>About Lalasia</h1>
          <p className={styles.header__description}>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Esse fuga magni nesciunt amet
            quia, consequatur odio neque rerum nisi soluta est dignissimos officia? Eos iste sed
            quod, numquam eum magni natus adipisci neque officia, ullam magnam. Molestiae
            repellendus ipsa, praesentium dolore quae optio earum maiores est necessitatibus aut
            amet, exercitationem dolor ipsum magni nostrum nemo possimus ab hic voluptatum natus?
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;

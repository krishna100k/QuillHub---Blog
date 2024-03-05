import styles from "./featured.module.css";

import React from "react";

interface FeaturedProps {
  imageLink?: string | undefined;
}

const Featured : React.FC<FeaturedProps> = ({imageLink}) => {
  return (
    <div style={{backgroundImage: `url(${imageLink})`}} className={styles.container}>
        
    </div>
    );
};

export default Featured;

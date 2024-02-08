import Header from "@/Components/Header";
import styles from "./post.module.css";

import React from "react";
import Featured from "@/Components/Featured";
import Comments from "@/Components/Comments";

const Post = () => {
  return (
    <>
      <Header />
      <Featured />
      <div className={styles.container}>
        <div className={styles.content}>
        <h1 className={styles.heading}>Exploring the Universe's Wonders</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Incidunt
          repellat quasi, officiis blanditiis numquam iste quam modi est
          deserunt ullam iure, exercitationem beatae quis voluptas error labore
          odio aut? Eos blanditiis harum distinctio laudantium ullam asperiores
          consectetur. Doloremque eius esse nisi, labore excepturi porro
          cupiditate odit magni reiciendis dolorum facere quis asperiores
          voluptatum obcaecati totam sunt, id animi. Deserunt eius inventore
          dolor fugiat similique qui ut animi, esse, et itaque quas temporibus
          porro nulla tempora atque! Quisquam eius obcaecati nobis blanditiis,
          accusantium recusandae eveniet commodi fugiat hic saepe? In aspernatur
          et deserunt. Amet minus incidunt ea odit officia laborum a
          consequuntur aspernatur accusantium, ipsam consectetur temporibus ex,
          itaque provident eveniet assumenda. Labore delectus reiciendis omnis
          aliquid fugit. Sint, consectetur! Quaerat accusamus suscipit minima,
          explicabo consectetur odio temporibus assumenda tempora molestiae
          expedita. Laboriosam ipsum delectus nobis laborum dicta odit corrupti
          a eligendi voluptatibus magni, ut cum beatae, quasi et similique
          consequuntur facere, reprehenderit iure fugiat consectetur reiciendis
          esse debitis dolorem ratione! Est, ab excepturi cumque omnis rem
          dolorem facere nisi dignissimos neque deleniti qui ipsa nostrum esse
          iusto sequi aut nobis consectetur dolor. Ullam nulla placeat commodi
          vel repudiandae. Culpa a ipsam, ut sit modi quibusdam vitae ratione at
          ex porro debitis atque laborum enim unde cupiditate. Rem rerum
          consequatur voluptatum, eligendi quasi exercitationem vel eos minima
          dolorem mollitia inventore quaerat nesciunt quo autem repellat id
          enim! Sequi, vitae repellendus? Minima, debitis vitae. Ea mollitia
          itaque, doloribus illo enim animi quam adipisci similique voluptatum
          error sint a perferendis eius eveniet facilis, quos quia modi tempora
          eaque quas. Incidunt corporis deserunt obcaecati ratione itaque non
          eius necessitatibus consequatur. Totam nobis optio impedit porro
          repellendus ducimus, voluptatem maiores odio et explicabo facere at
          maxime dicta. Obcaecati laboriosam laudantium, quam corporis
          voluptatibus fugiat perspiciatis velit enim blanditiis minus eius
          quia? Harum veniam voluptatum fugiat.
        </p>
        </div>
        <div className={styles.comments}>
          <h1 className={styles.commentHeading}>Comments</h1>
          <div className={styles.commentArea}>
          <textarea className={styles.commentInput} placeholder="Write a Comment"></textarea>
          <button className={styles.submit}>Submit</button>
          </div>
        </div>
        <Comments />
        <Comments />
        <Comments />
      </div>
    </>
  );
};

export default Post;

import React from "react";
import styles from "./AvatarSkeleton.module.sass";
import Skeleton from "react-loading-skeleton";

const AvatarSkeleton = ({cards, width}) => {
    return <Skeleton 
            baseColor="#c4c4c4"
            width={100}
            height={100}
            borderRadius={10}
    />
//   return (
//     Array(cards).fill(0).map((_, index) => {
//       return (<div className={styles.card__skeleton} key={index}>
//       <div className={styles.column} style={{"width" : width}}>
//         <Skeleton
//           baseColor="#c4c4c4"
//           circle
//           width={40}
//           height={40}
//           style={{ marginBottom: ".6rem" }}
//         />
//         <Skeleton
//           baseColor="#c4c4c4"
//           style={{ marginBottom: ".6rem" }}
//           count={5}
//         />
//         <Skeleton
//           baseColor="#c4c4c4"
//           style={{ marginBottom: ".6rem" }}
//           count={1}
//           width={70}
//         />
//       </div>
//     </div>)
//     })
//   );
};

export default AvatarSkeleton;

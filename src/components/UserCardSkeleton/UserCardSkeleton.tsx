import styles from "./UserCardSkeleton.module.scss";

export const UserCardSkeleton = () => {
  const skeletonCount = 6;

  return (
    <>
      {Array.from({ length: skeletonCount }).map((_, index) => (
        <div key={index} className={styles.userCard}>
          <div className={styles.avatarContainer}>
            <div className={`${styles.avatar} ${styles.skeleton}`}></div>
            <div className={styles.userInfo}>
              <div className={styles.nameContainer}>
                <span className={`${styles.firstName} ${styles.skeleton}`}></span>
                <span className={`${styles.userTag} ${styles.skeleton}`}></span>
              </div>
              <span className={`${styles.userRole} ${styles.skeleton}`}></span>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
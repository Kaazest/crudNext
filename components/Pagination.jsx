import { useRouter } from "next/navigation";
import styles from "@/components/Pagination.module.css";
const NavPage = () => {
  const router = useRouter();

  const handleNavigationL = () => {
    router.push("/ver" - 1);
  };
  const handleNavigationR = () => {
    router.push("/ver" + 1);
  };

  return (
    <div className={styles.pagination}>
      <a onClick={handleNavigationL}>&laquo;</a>
      <a href="#">1</a>
      <a href="#">2</a>
      <a href="#">3</a>
      <a href="#">4</a>
      <a href="#">5</a>
      <a onClick={handleNavigationR}> &raquo;</a>
    </div>
  );
};

export default NavPage;

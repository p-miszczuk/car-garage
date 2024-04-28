import { nav } from "../../constants";
import HeaderMenuView from "./header-menu-view";

const HeaderMenu = () => {
  return (
    <nav data-testid="header-nav">
      <ul className="flex gap-2 items-center h-full">
        {nav.map((props) => (
          <HeaderMenuView key={props.id} {...props} />
        ))}
      </ul>
    </nav>
  );
};

export default HeaderMenu;

const year = new Date().getFullYear();

export const FOOTER_TEXT = "All rights reserved - Car Garage";

const FooterContainer = () => {
  return (
    <footer className="w-full h-12 border-t-2 flex items-center justify-center">
      <p>
        &copy; {FOOTER_TEXT} {year}
      </p>
    </footer>
  );
};

export default FooterContainer;

const year = new Date().getFullYear();

const FooterContainer = () => {
  return (
    <footer className="w-full h-12 border-t-2 flex items-center justify-center">
      <p>&copy; All rights reserved - Car Garage {year}</p>
    </footer>
  );
};

export default FooterContainer;

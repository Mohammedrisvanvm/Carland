import React, { useEffect, useState } from "react";
import { useAppSelector } from "../redux/store/storeHook";
import { AxiosResponse } from "../interfaces/axiosinterface";
import { getBookings } from "../services/apis/vendorApi/vendorApi";
import { IConfirmBookWithImage } from "../interfaces/bookingConfirmInterface";

const Newadmin = () => {
  const [sidebarWidth, setsidebarWidth] = useState<boolean>(true);
  const [spanVisible, setSpanVisible] = useState<boolean>(false);

  const [bookings, setBookings] = useState<IConfirmBookWithImage[] | null>(
    null
  );
  const id = useAppSelector((state) => state.vendor.hubId);
  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        // const response: any = [];
        const response: AxiosResponse = await getBookings(id);
        console.log(response);
        if (response.data?.bookingDetails)
          setBookings(response.data.bookingDetails);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  interface SidebarButtonProps {
    label: string;
  }
  //   const SidebarButton: React.FC<SidebarButtonProps> = ({ label }) => {
  //     const [spanVisible, setSpanVisible] = useState(false);

  //     const handleButtonClick = () => {
  //       setSpanVisible(!spanVisible);
  //     }}

  const highlightSidebarItem: (element: HTMLElement | any) => void = (
    element
  ) => {
    const buttons = document.querySelectorAll(
      "#sidebar button"
    ) as unknown as HTMLButtonElement[];
    buttons.forEach((btn: any) => {
      btn.classList.remove(
        "bg-gradient-to-r",
        "from-cyan-400",
        "to-cyan-500",
        "text-white",
        "w-48",
        "ml-0"
      );
      btn.firstChild?.nextSibling?.classList.remove("text-white");
    });
    element.classList.add(
      "bg-gradient-to-r",
      "from-cyan-400",
      "to-cyan-500",
      "w-56",
      "h-10",
      "ml-0"
    );
    element.firstChild?.nextSibling?.classList.add("text-white");
  };
  return (
    <body>
      <nav className="bg-white border-b border-gray-300">
        <div className="flex justify-between items-center px-6">
          <button
            id="menu-button"
            onClick={() => {
              // expandSidebar()
              setsidebarWidth(!sidebarWidth);
              setSpanVisible(!spanVisible);
            }}
          >
            {/* <button id="menu-button" onclick="expandSidebar()"> */}
            <svg
              className="w-5 h-5 text-gray-500 dark:text-gray-400"
              aria-hidden="true"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fill-rule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </button>
          <div className="mx-auto">
            <img
              src="https://www.emprenderconactitud.com/img/POC%20WCS%20(1).png"
              alt="logo"
              className="h-20 w-28"
            />
          </div>
          <div className="space-x-4">
            <button>
              <svg
                className="w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 22 21"
              >
                <path d="M16.975 11H10V4.025a1 1 0 0 0-1.066-.998 8.5 8.5 0 1 0 9.039 9.039.999.999 0 0 0-1-1.066h.002Z" />
                <path d="M12.5 0c-.157 0-.311.01-.565.027A1 1 0 0 0 11 1.02V10h8.975a1 1 0 0 0 1-.935c.013-.188.028-.374.028-.565A8.51 8.51 0 0 0 12.5 0Z" />
              </svg>
            </button>
            <button>
              <svg
                className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                height="1em"
                viewBox="0 0 448 512"
              >
                <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
              </svg>{" "}
            </button>
          </div>
        </div>
      </nav>

      <div
        id="sidebar"
        className="bg-white text-black h-screen fixed rounded-none border-none transition-all duration-200 ease-in-out overflow-hidden"
      >
        <div className="p-2 space-y-4">
          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={highlightSidebarItem}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>
            <span
              className={`font-medium transition-all duration-200 ${
                spanVisible ? "opacity-0" : ""
              }`}
            >
              Inicio
            </span>
          </button>

          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={highlightSidebarItem}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>{" "}
            <span
              className={`font-medium transition-all duration-200 ${
                spanVisible ? "opacity-0" : ""
              }`}
            >
              {" "}
              Autorizaciones
            </span>
          </button>

          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={highlightSidebarItem}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>{" "}
            <span
              className={`font-medium transition-all duration-200 ${
                spanVisible ? "opacity-0" : ""
              }`}
            >
              {" "}
              Usuarios
            </span>
          </button>

          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={highlightSidebarItem}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>{" "}
            <span
              className={`font-medium transition-all duration-200 ${
                spanVisible ? "opacity-0" : ""
              }`}
            >
              {" "}
              Comercios
            </span>
          </button>

          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={highlightSidebarItem}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>{" "}
            <span
              className={`font-medium transition-all duration-200 ${
                spanVisible ? "opacity-0" : ""
              }`}
            >
              {" "}
              Transacciones
            </span>
          </button>

          <button
            className="relative px-3 py-3 flex items-center space-x-4 justify-start text-gray-500 rounded-lg group"
            onClick={highlightSidebarItem}
          >
            <svg
              className="flex-shrink-0 w-5 h-5 text-gray-500 transition duration-75 dark:text-gray-400 group-hover:text-gray-900 dark:group-hover:text-white"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="currentColor"
              height="1em"
              viewBox="0 0 448 512"
            >
              <path d="M224 256A128 128 0 1 0 224 0a128 128 0 1 0 0 256zm-45.7 48C79.8 304 0 383.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7C448 383.8 368.2 304 269.7 304H178.3z" />
            </svg>{" "}
            <span
              className={`font-medium transition-all duration-200 ${
                spanVisible ? "opacity-0" : ""
              }`}
            >
              {" "}
              Cerrar sesión
            </span>
          </button>
        </div>
      </div>

      <div
        className={` ${
          sidebarWidth ? "w-64 ml-64 text-left px-6" : "w-16 text-center ml-16"
        } bg-gray-100  fixed w-full lg:w-3/4 transition-all duration-200 ease-in-out h-96 overflow-y-auto`}
        style={{height:"500px"}}
      >
        {/* <div className="flex items-center w-full mt-2 p-4">
          <div className="relative w-full">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>{" "}
            </span>
            <input
              type="text"
              className="pl-10 pr-4 py-2 rounded-full border border-gray-300 w-full text-sm placeholder-gray-400"
              placeholder="Buscar..."
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mt-2 p-4">
          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Usuarios
            </h2>
            <div
              className="chart-container"
              style={{ position: "absolute", height: "200px", width: "200px" }}
            >
              <canvas id="usersChart"></canvas>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Comercios
            </h2>
            <div
              className="chart-container "
              style={{ position: "absolute", height: "200px", width: "200px" }}
            >
              <canvas id="commercesChart"></canvas>
            </div>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Autorizaciones Pendientes
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Foto
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Rol
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    <img
                      src="https://via.placeholder.com/40"
                      alt="Foto Perfil"
                      className="rounded-full h-10 w-10"
                    />
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    Juan Pérez
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    Administrador
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-white p-4 rounded-md">
            <h2 className="text-gray-600 text-lg font-semibold pb-4">
              Transacciones
            </h2>
            <table className="w-full table-auto">
              <thead>
                <tr className="text-sm leading-normal">
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Nombre
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light">
                    Fecha
                  </th>
                  <th className="py-4 px-6 bg-grey-lightest font-bold uppercase text-sm text-grey-dark border-b border-grey-light text-right">
                    Monto
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-grey-lighter">
                  <td className="py-4 px-6 border-b border-grey-light">
                    Carlos Sánchez
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light">
                    27/07/2023
                  </td>
                  <td className="py-4 px-6 border-b border-grey-light text-right">
                    $1500
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
        <table className="w-full text-sm text-left  text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                index
              </th>
              <th scope="col" className="px-6 py-3">
                vehicle image
              </th>
              <th scope="col" className="px-6 py-3">
                Vehicle Name
              </th>
              <th scope="col" className="px-6 py-3">
                hubName
              </th>

              <th scope="col" className="px-6 py-3">
                bookingStartDate
              </th>

              <th scope="col" className="px-6 py-3">
                bookingEndDate
              </th>

              <th scope="col" className="px-6 py-3">
                days
              </th>
              <th scope="col" className="px-6 py-3">
                totalPrice
              </th>

              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            {bookings
              ? bookings.map((item, index) => (
                  <tr
                    key={item._doc._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {index + 1}
                    </td>
                    <td className="px-6 py-4">
                      <img
                        src={item.image}
                        className="w-16 h-12 object-cover"
                      />
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._doc.vehicleName}
                    </td>
                    <td className="px-6 py-4">{item._doc.hubName}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(
                        item._doc.bookingStartDate
                      ).toLocaleDateString()}
                    </td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {new Date(item._doc.bookingEndDate).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4">{item._doc.days}</td>
                    <td
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      {item._doc.totalPrice}
                    </td>
                    <td className="px-6 py-4">
                      <button className="flex items-center justify-center dark:text-blue-500  h-10 w-28 rounded bg-grey dark:bg-gray-800 shadow shadow-black/20 dark:shadow-black/40">
                        <span
                          className={`${
                            item._doc.status ? "text-red-600" : "text-blue-600 "
                          }`}
                        >
                          {item._doc.status}
                        </span>
                      </button>
                    </td>
                  </tr>
                ))
              : ""}
          </tbody>
        </table>
      </div>
    </body>
  );
};

export default Newadmin;

{
  /* <script>
    function expandSidebar() {
        const sidebar = document.getElementById('sidebar');
        const mainContent = document.querySelector('.ml-16');

        if (sidebar.style.width === '16rem') {
            sidebar.style.width = '4rem';
            mainContent.style.marginLeft = '4rem';
            sidebar.classList.remove('text-left', 'px-6');
            sidebar.classList.add('text-center', 'px-0');
        } else {
            sidebar.style.width = '16rem';
            mainContent.style.marginLeft = '16rem';
            sidebar.classList.add('text-left', 'px-6');
            sidebar.classList.remove('text-center', 'px-0');
        }

        const labels = sidebar.querySelectorAll('span');
        labels.forEach(label => label.classList.toggle('opacity-0'));
    }

    function highlightSidebarItem(element) {
    const buttons = document.querySelectorAll("#sidebar button");
    buttons.forEach(btn => {
        btn.classList.remove('bg-gradient-to-r', 'from-cyan-400', 'to-cyan-500', 'text-white', 'w-48', 'ml-0');
        btn.firstChild.nextSibling.classList.remove('text-white');
    });
    element.classList.add('bg-gradient-to-r', 'from-cyan-400', 'to-cyan-500', 'w-56', 'h-10','ml-0');
    element.firstChild.nextSibling.classList.add('text-white');
    }

    // Para la gráfica de Usuarios
    var ctx = document.getElementById('usersChart').getContext('2d');
    new Chart(ctx, {
        type: 'doughnut',
        data: {
            labels: ['Usuarios Nuevos', 'Usuarios Registrados'],
            datasets: [{
                data: [50, 50],
                backgroundColor: ['cyan', 'yellow'],
            }]
        },
        options: {
            responsive: true,
        }
    });

    // Para la gráfica de Comercios
    var ctx2 = document.getElementById('commercesChart').getContext('2d');
    new Chart(ctx2, {
        type: 'doughnut',
        data: {
            labels: ['Comercios Nuevos', 'Comercios Registrados'],
            datasets: [{
                data: [60, 40],
                backgroundColor: ['cyan', 'yellow'],
            }]
        },
        options: {
            responsive: true,
        }
    });
</script> */
}

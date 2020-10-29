import React, { useEffect } from "react";
import { fade, makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MoreIcon from "@material-ui/icons/MoreVert";
import Category from "../Categories/Categories";
import { Link } from "react-router-dom";
import SearchBar from "../SearchBar/SearchBar"; // Importamos la SearchBar(cambiamos original de Material ui)
import AddShoppingCartIcon from "@material-ui/icons/AddShoppingCart";
import BuildIcon from "@material-ui/icons/Build";
import { getcarrito } from "../../Redux/Carrito";
import { logoutUser } from "../../Redux/user";
import { useSelector, useDispatch } from "react-redux";
import "./NavBar.css";
import "../../index.css";

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block",
    },
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      marginLeft: theme.spacing(3),
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
  sectionDesktop: {
    display: "none",
    [theme.breakpoints.up("md")]: {
      display: "flex",
    },
  },
  sectionMobile: {
    display: "flex",
    [theme.breakpoints.up("md")]: {
      display: "none",
    },
  },
}));

export default function PrimarySearchAppBar({ setSearchApp }) {
  const usuario = useSelector((store) => store.user.user);
  const carrito = useSelector((store) => store.carrito.carrito);
  const dispatch = useDispatch();

  useEffect(() => {
    console.log(usuario.id);
    console.log(usuario);
    dispatch(getcarrito(1));
    // const fetchData =async()=>{
    //   await axios.post(`http://localhost:4000/users/1/carrito`)
    // }
    // fetchData()
  }, [usuario]);

  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {/* <Link to='/admin' > <MenuItem onClick={handleMenuClose}>Admin</MenuItem> </Link> */}
      {/* crear funcion op.ternario para rol admin = true --> show admin features */}
      {!usuario.id && (
        <Link to="/login">
          {" "}
          <MenuItem onClick={handleMenuClose}>Iniciá Sesión</MenuItem>{" "}
        </Link>
      )}
      {!usuario.id && (
        <Link to="/NuevaCuenta">
          {" "}
          <MenuItem onClick={handleMenuClose}>Registrate</MenuItem>{" "}
        </Link>
      )}
      {usuario.id ? (
        <h6 className="logueado">Logueado como {usuario.name}</h6>
      ) : null}
      {usuario.id && (
        <Link to="/userActivity">
          {" "}
          <MenuItem onClick={handleMenuClose}>
            Actividad del Usuario
          </MenuItem>{" "}
        </Link>
      )}
      {usuario.id && (
        <Link to="/">
          {" "}
          <MenuItem onClick={() => dispatch(logoutUser())}>
            Cerrar Sesión
          </MenuItem>{" "}
        </Link>
      )}
    </Menu>
  );

  return (
    <div className={classes.grow}>
      <AppBar position="static" style={{ backgroundColor: "white" }}>
        {/* //cambia color de la navbar */}
        <Toolbar>
          <button
            style={{
              backgroundColor: "white",
              color: "black",
              fontFamily: "sans-serif",
              border: "0",
              fontSize: "5px",
            }}
          >
            <header id="home" className="header">
              <nav className="navbar fixed-top navbar-light bg-light">
                <div className="nav-center container">
                  <a href="#home" className="logo">
                    <h1>
                      HENRY <span>BEERS</span>
                    </h1>
                  </a>
                  <div className="nav-menu">
                    <div className="nav-top">
                      <div className="logo">
                        <h1>
                          HENRY<span>BEERS</span>
                        </h1>
                      </div>
                      <Category />
                      <div className="close">
                        <i className="fas fa-times"></i>
                      </div>
                    </div>
                    <ul className="nav-list">
                      <li className="nav-item">
                        <a href="#home" className="nav-link scroll-link">
                          Inicio
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#shop" className="nav-link scroll-link">
                          Cervezas
                        </a>
                      </li>

                      <li className="nav-item">
                        <a href="#new" className="nav-link scroll-link">
                          Hot
                        </a>
                      </li>
                      <li className="nav-item">
                        <a href="#blog" className="nav-link scroll-link">
                          Nosotros
                        </a>
                      </li>
                    </ul>
                  </div>

                  <div className="nav-icons">
                    {/* hacer menu desplegable para login y registrarse */}
                    {!usuario.id && (
                      <Link to="/login">
                        {" "}
                        <span>
                          <i className="fas fa-user"></i>
                        </span>
                      </Link>
                    )}
                    <span>
                      <i className="fas fa-shopping-basket"></i>
                    </span>
                  </div>

                  <div className="hamburger">
                    <i className="fas fa-bars"></i>
                  </div>
                </div>
              </nav>
            </header>
          </button>
          <SearchBar setSearchApp={setSearchApp} />
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton aria-label="carrito" color="inherit">
              <Link to="/carrito">
                {" "}
                <Badge
                  badgeContent={
                    carrito.products &&
                    carrito.products[0] &&
                    carrito.products.length
                  }
                  color="secondary"
                >
                  <AddShoppingCartIcon />
                </Badge>
              </Link>
            </IconButton>

            {/* LINK A ADMIN */}
            {usuario.isAdmin && (
              <Link to="/admin">
                <IconButton aria-label="admin" color="inherit">
                  <Badge color="secondary">
                    <BuildIcon />
                  </Badge>
                </IconButton>
              </Link>
            )}
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMenu}
    </div>
  );
}

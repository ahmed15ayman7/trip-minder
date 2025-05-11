// components/Header.js
"use client"
import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Menu } from '@headlessui/react';
import { useSession } from 'next-auth/react';
import { Skeleton } from '@mui/material';

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  let { data, status } = useSession()

  return (
    <header style={styles.header}>
      <div style={styles.logo}>
        <Link href={"/"}>
          <img src="/images/logo.svg" alt="Logo" style={styles.logoImage} />
        </Link>
      </div>
      <input
        type="text"
        placeholder="Search destinations or activities"
        style={styles.searchInput}
      />
      <nav style={styles.nav}>
        <div className="hidden md:flex">
          {/* <Link href="/destinations" style={styles.navLink}>Destinations</Link>
          <Link href="/activities" style={styles.navLink}>Activities</Link>
          <Link href="/currency" style={styles.navLink}>USD</Link> */}
          {/* {!data && */}
          <>
            <Link href="/auth/register" style={styles.registerButton}>Register</Link>
            <Link href="/auth/login" style={styles.loginButton}> Log in
            </Link></>
          {/* } */}
        </div>
        <div className="md:hidden">
          <button onClick={() => setIsOpen(!isOpen)} style={styles.menuButton}>
            ☰
          </button>
        </div>
      </nav>
      {isOpen && (
        <Menu as="div" style={styles.drawer}>
          {/* <Menu.Item>
            {({ active }) => (
              <Link href="/destinations" style={active ? styles.activeLink : styles.drawerLink}>Destinations</Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href="/activities" style={active ? styles.activeLink : styles.drawerLink}>Activities</Link>
            )}
          </Menu.Item>
          <Menu.Item>
            {({ active }) => (
              <Link href="/currency" style={active ? styles.activeLink : styles.drawerLink}>USD</Link>
            )}
          </Menu.Item> */}
          {!data &&
            <>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/auth/register" style={styles.registerButton}>Register</Link>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <Link href="/auth/login" style={styles.loginButton}>Log in
                  </Link>
                )}
              </Menu.Item></>}
        </Menu>
      )}
    </header>
  );
};

const styles = {
  header: {
    display: 'flex',
    position: 'sticky' as 'sticky',
    top: '0',
    left: '0',
    right: '0',
    zIndex: '100',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '10px 20px',
    backgroundColor: '#fff',
    borderBottom: '1px solid #ddd',
  },
  logo: {
    display: 'flex',
    alignItems: 'center',
  },
  logoImage: {
    width: '167px',
    height: '32px',
    marginRight: '10px',
  },
  searchInput: {
    flex: 1,
    margin: '0 20px',
    padding: '5px 10px',
    border: '1px solid #ddd',
    borderRadius: '4px',
  },
  nav: {
    display: 'flex',
    alignItems: 'center',
  },
  navLink: {
    margin: '0 10px',
    color: '#000',
    textDecoration: 'none',
  },
  loginButton: {
    backgroundColor: '#f60',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 15px',
    cursor: 'pointer',
  },
  registerButton: {
    color: '#f60',
    backgroundColor: '#fff',
    border: 'none',
    borderRadius: '4px',
    padding: '5px 15px',
    cursor: 'pointer',
  },
  menuButton: {
    backgroundColor: 'transparent',
    border: 'none',
    fontSize: '24px',
    cursor: 'pointer',
  },
  drawer: {
    position: 'absolute' as 'absolute',
    top: '60px',
    right: '0',
    backgroundColor: '#fff',
    boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
    borderRadius: '8px',
    overflow: 'hidden',
  },
  drawerLink: {
    display: 'block',
    padding: '10px 20px',
    color: '#000',
    textDecoration: 'none',
  },
  activeLink: {
    backgroundColor: '#f0f0f0',
  },
  drawerButton: {
    display: 'block',
    width: '100%',
    padding: '10px 20px',
    backgroundColor: '#f60',
    color: '#fff',
    border: 'none',
    textAlign: 'left',
  },
  activeButton: {
    backgroundColor: '#e55',
  },
};

export default Header;
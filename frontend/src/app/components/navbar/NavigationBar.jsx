"use client"

import {
  Navbar, 
  NavbarBrand, 
  NavbarContent, 
  NavbarItem, 
  NavbarMenuToggle,
  NavbarMenu,
  NavbarMenuItem
} from "@nextui-org/navbar";
import { Link } from "@nextui-org/link";
import { Button } from "@nextui-org/button";
  

function NavigationBar() {
    return (
    <Navbar>
        <NavbarBrand>
          <p>Kitchen Wizard</p>
        </NavbarBrand>
        <NavbarContent justify="center">
        <NavbarItem isActive>
            <Link href="/">
              Home
            </Link>
          </NavbarItem>
          <NavbarItem>
            <Link color="foreground" href="formulas">
              Formulas
            </Link>
          </NavbarItem>
        
          <NavbarItem>
            <Link color="foreground" href="recipes">
              Recipes
            </Link>
          </NavbarItem>
        </NavbarContent>
        <NavbarContent justify="end">
          <NavbarItem className="hidden lg:flex">
            <Link href="#">Login</Link>
          </NavbarItem>
          <NavbarItem>
            <Button as={Link} color="primary" href="#" variant="flat">
              Sign In
            </Button>
          </NavbarItem>
        </NavbarContent>
      </Navbar>);
}

export default NavigationBar;
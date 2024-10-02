"use client"
//import './globals.css';
//import Modal from "./components/Modal"
import FormulaForm from './FormulaForm.js';
import NavigationBar from '../components/navbar/NavigationBar.jsx';
import axios from 'axios'
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

function FormulaMakerPage() {


  return (
    
    <div className="App">
       <NavigationBar/>
      <h1>New Recipe Template</h1>
      <FormulaForm/>
    </div>
  );
}

export default FormulaMakerPage;

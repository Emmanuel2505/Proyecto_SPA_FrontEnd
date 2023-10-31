//import ConteinerProductDetails from "./src/components/ConteinerProductDetails";
import ConteinerProductDetails from "../../components/ConteinerProductDetails";
import {useParams} from "react-router-dom"
import { useState, useEffect } from "react"
import React from "react";
//import { useSelector } from 'react-redux';


export default function ProductDetails() {
  const paramans = useParams();

  return <ConteinerProductDetails className="pb-8" title={paramans}/>;
}

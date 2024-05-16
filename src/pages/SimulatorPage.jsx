
import HeaderInner from "../components/HeaderInner";
import { VirtualStepper } from "../components/simulator/VirtualStepper";
import HomePageButton from "../components/buttons/HomePageButton";
import { useNavigate } from "react-router-dom";
import { useQuestionsStepper } from "../store/StoreStepper";
import { SimulatorPageContent } from "../store/content/SimulatorPageContent";
import React from "react";

const Virtual = () => {
  let navigate = useNavigate();
  const { setActiveStep , QChecked, QCheckedState, setDisabledState, isDisabled,setCheckCount } = useQuestionsStepper();
  
  function HandleClick(){
    setActiveStep(0);
    navigate('/')
    QChecked && QCheckedState() 
    isDisabled && setDisabledState();
    setCheckCount(0);
  }

  return (
    <div className="h-screen flex flex-col justify-between relative ">
      <HeaderInner
        title={SimulatorPageContent.title}
      />
      
      <VirtualStepper />

      <HomePageButton onClick={HandleClick} />
    </div>
  );
};

export default Virtual;

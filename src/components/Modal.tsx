import React from "react";

import Switch from "./Switch";
import { IoMdClose } from "react-icons/io";
type Options = {
    fly: boolean;
    miniMap:boolean;
    layers:boolean
}

type Props = {
    options: Options;
    setOptions: (options: Options) => void;
    close: (options: boolean) => void;
}
export function Modal({ options, setOptions, close }: Props) {
    const handleSwitchChange = (newValue: boolean, type: string) => {
        if(type == "fly"){
            setOptions({ ...options, fly: newValue });

        }else if(type =="miniMap"){
            setOptions({ ...options, miniMap: newValue });
        }else{

            setOptions({ ...options, layers: newValue });
        }
    };

    return (
        <section className="bg-white w-1/2 h-1/2 rounded-lg shadow-lg text-black p-2 relative">
            <button className=" absolute right-5 top-5" onClick={()=>{close(false)}}>
                <IoMdClose></IoMdClose>
            </button>
            <h1 className="text-2xl">Settings</h1>
            <div className="mt-2">
                <Switch
                    onChange={(check: boolean) => {
                        handleSwitchChange(check, "fly");
                    }}
                    enabled={options.fly}
                    header="Fly"
                    description="Set the map to fly when you change coordinates."
                />
                <Switch
                    onChange={(check: boolean) => {
                        handleSwitchChange(check, "miniMap");
                    }}
                    enabled={options.miniMap}
                    header="Mini Map"
                    description="A small map on the top right of the screen"
                />
                <Switch
                    onChange={(check: boolean) => {
                        handleSwitchChange(check, "layers");
                    }}
                    enabled={options.layers}
                    header="Layers"
                    description="Add layers option"
                />
            </div>
        </section>
    );
}

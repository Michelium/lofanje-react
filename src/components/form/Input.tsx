import React, { InputHTMLAttributes, useRef } from "react";
import { OverlayPanel } from "primereact/overlaypanel";
import Button from "../ui/Button";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    className?: string;
    specialCharactersHelper?: boolean;
}

const Input = ({ className = "", specialCharactersHelper = false, ...props }: InputProps) => {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const specialCharactersOverlayPanel = useRef<OverlayPanel | null>(null);

    const handleSpecialCharacterClick = (e: React.MouseEvent<HTMLButtonElement>) => {
        const character = e.currentTarget.getAttribute("data-value");
        if (character && inputRef.current) {
            // Append the character to the current input value
            inputRef.current.value += character;
            inputRef.current.focus();

            // Manually trigger the onChange callback if provided
            if (props.onChange) {
                const syntheticEvent = {
                    ...e,
                    target: inputRef.current,
                    currentTarget: inputRef.current
                } as React.ChangeEvent<HTMLInputElement>;

                props.onChange(syntheticEvent);
            }
        }
    };

    return (
        <div>
            <input ref={inputRef} className={`bg-gray-800 text-white border border-gray-600 rounded-[4px] py-2 px-4 focus:outline-none focus:border-gray-400 focus:bg-gray-700
                           transition-all duration-200 ease-in-out placeholder-gray-400 hover:border-gray-400 ${className}`} {...props}
                   onClick={(e) => specialCharactersHelper && specialCharactersOverlayPanel.current?.toggle(e)}
            >
            </input>
            <OverlayPanel ref={specialCharactersOverlayPanel} appendTo={document.body}>
                <div className="flex flex-col gap-y-4">
                    <div className="flex gap-x-2">
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ˌ">ˌ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ˈ">ˈ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ǝ">ǝ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ð">ð</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ɛ">ɛ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ɣ">ɣ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ʒ">ʒ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ɲ">ɲ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ɔ">ɔ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ɾ">ɾ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ʃ">ʃ</Button>
                    </div>
                    <div className="flex gap-x-2">
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="«">«</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="»">»</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="→">→</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ç">ç</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="æ">æ</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="œ">œ</Button>
                    </div>
                    <div className="flex gap-x-2">
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="Á">Á</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="á">á</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="É">É</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="é">é</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="Í">Í</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="í">í</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="Ó">Ó</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ó">ó</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="Ú">Ú</Button>
                        <Button onClick={handleSpecialCharacterClick} size="small" className="btn btn-outline-secondary text-white ipa-button" type="button" data-value="ú">ú</Button>
                    </div>
                </div>
            </OverlayPanel>
        </div>
    );
};

export default Input;
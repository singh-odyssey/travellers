import React from 'react'

type Props = {
    theme: "light" | "dark" | null;
    changeTheme: ()=> void;
}

const Toggle = (props: Props) => {
  return (
    <div className="relative">
              <input
                checked={props.theme!=="light"}
                onChange={props.changeTheme}
                className="hidden peer"
                type="checkbox"
                id="theme"
              />
              <label className="peer-checked:bg-blue-500 before:transition before:duration-300 peer-checked:before:translate-x-4 transition duration-300 absolute top-0 bottom-0 left-0 right-0 w-10 before:content-[''] before:absolute before:h-4 before:bg-white before:w-4 pl-1 before:top-1/2 before:-translate-y-1/2 before:rounded-full bg-neutral-400 rounded-xl" htmlFor="theme"/>
            </div>
  )
}

export default Toggle

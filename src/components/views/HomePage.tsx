"use client";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import { useSnapshot } from "valtio";
import { CustomButton } from "@/components/CustomButton";
import { state } from "@/store";
import {
  headContainerAnimation,
  headContentAnimation,
  headTextAnimation,
  slideAnimation,
} from "@/config/motion";
//home
export default function HomePage() {
  const snap = useSnapshot(state);

  return (
    <AnimatePresence>
      {snap.intro && (
        <motion.section className="home" {...slideAnimation("left")}>
          <motion.header>
            <Image
              src="/threejs.png"
              alt="logo"
              width={32}
              height={32}
              className="object-contain"
            />
          </motion.header>

          <motion.div className="home-content" {...headContainerAnimation}>
            <motion.div {...headTextAnimation}>
              <h1 className="head-text">
                LET&apos;S <br className="xl:block hidden" />
                DO IT
              </h1>
            </motion.div>
            <motion.div
              {...headContentAnimation}
              className="flex flex-col gap-5"
            >
              <p className="max-w-md font-normal text-gray-600 text-base">
                Lorem ipsum dolor, sit amet consectetur adipisicing elit.
                Laborum mollitia, voluptate nisi vitae, eos atque excepturi
                fugit dolor assumenda hic maxime! Impedit mollitia culpa esse!
                Reprehenderit ad exercitationem animi aut.
              </p>
              <CustomButton
                type="filled"
                title="Customize It"
                handleClick={() => (state.intro = false)}
                customStyles="w-fit px-4 py-2.5 font-bold text-sm"
              />
            </motion.div>
          </motion.div>
        </motion.section>
      )}
    </AnimatePresence>
  );
}

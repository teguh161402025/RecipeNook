"use client";
import '../app/globals.css'
import { AiOutlineClose } from "react-icons/ai";
import Colors from './Colors';
import React, { useState, useEffect } from 'react'
import Image from 'next/image';
const Modal = ({ data, closed, togle }) => {
    const [modal, setModal] = useState(closed);



    useEffect(() => {

        if (closed == true) {
            setModal(true);
        }


    }, [closed, togle])


    return (
        <div className={`${modal == true ? 'block ' : 'hidden'} fixed z-50 h-[100%] w-full bg-black bg-opacity-90  flex items-center justify-center py-4`}>

            {
                data ?
                    <div className='bg-fontlight animate__animated animate__fadeInDown  relative shadow-lg lg:flex lg:flex-row rounded-xl w-full mx-[10%] text-fontdark h-full p-4 overflow-auto xl:pt-[5vh]'>

                        <div className='xl:w-1/2'>

                            <div className='flex border-b-2 border-b-secondary  pb-4'>
                                <Image className='rounded-lg shadow-md'
                                    src={data.recipe.image}
                                    width={120}
                                    height={120}
                                    alt={data.recipe.label}
                                    loading="lazy"
                                    sizes="(max-width: 768px) 100vw"
                                    placeholder="blur"
                                    blurDataURL={'/assets/Placeholder_image.png'}
                                />
                                <div className='px-2 font-bold flex items-center justify-center text-xl'>
                                    <p className='md:pl-12'>{data.recipe.label}</p>
                                </div>
                            </div>
                            <div className='px-4 flex flex-row justify-around py-2 md:mt-8'>
                                <div className=' font-semibold text-center'>
                                    <p className='text-lg'>{parseInt(data.recipe.yield, 10)}</p>
                                    <p className='text-sm'>Servings</p>
                                </div>
                                <div className='text-lg font-semibold text-center '>
                                    <p>{parseInt(data.recipe.calories / data.recipe.yield, 10)}</p>
                                    <p className='text-sm'>Kcal</p>
                                </div>
                            </div>
                            <div className='flex flex-row bg-secondary justify-around text-sm text-fontlight m-2 p-2 rounded-tl-xl rounded-br-xl shadow-md md:mb-8' >
                                <div className='text-center'>
                                    <p className='font-semibold'>Protein</p>
                                    <p>{parseInt(data.recipe.totalNutrients.PROCNT.quantity / data.recipe.yield, 10) + 'g'}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='font-semibold'>Fat</p>
                                    <p>{parseInt(data.recipe.totalNutrients.FAT.quantity / data.recipe.yield, 10) + 'g'}</p>
                                </div>
                                <div className='text-center'>
                                    <p className='font-semibold'>Carbo</p>
                                    <p>{parseInt(data.recipe.totalNutrients.CHOCDF.quantity / data.recipe.yield, 10) + 'g'}</p>
                                </div>
                            </div>
                            <div className='text-fontdark space-y-2 pt-4 border-t-2 border-t-secondary '>
                                <div className='text-xl font-semibold '>Ingredients</div>
                                {
                                    data.recipe.ingredients ? data.recipe.ingredients.map((a, index) =>

                                        <div key={index} className='flex space-x-2 space-y-2 border-b-2 border-gray-300 pb-4'>

                                            <div className='mr-2 py-2'>{index + 1}.  </div>
                                            <Image className='rounded-lg shadow-md'
                                                src={a.image ? a.image : '/assets/no-photo-available.png'}
                                                width={80}
                                                height={80}
                                                alt={a.text}
                                                loading="lazy"
                                                sizes="(max-width: 768px) 100vw"
                                                placeholder="blur"
                                                blurDataURL={'/assets/Placeholder_image.png'}
                                            />
                                            <div className='p-2 text-sm '>{a.text}</div>

                                        </div>

                                    ) : ''
                                }
                            </div>
                        </div>
                        <div className='divide-y-2 divide-primary lg:w-1/3 bg-secondary lg:ml-16 lg:mr-4 lg:px-8 text-fontlight shadow-lg md:rounded-tl-[50px] md:rounded-br-[50px] h-fit xl:w-1/2'>
                            <div className={`flex flex-row justify justify-between p-2 mt-4 ${data.recipe.totalNutrients.FIBTG ? 'block' : 'hidden'}`}>
                                <div className='font-semibold text-md'>Fiber </div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.FIBTG ? data.recipe.totalNutrients.FIBTG.quantity : 0 / data.recipe.yield, 10) + '   gr'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Sugar </div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.SUGAR ? data.recipe.totalNutrients.SUGAR.quantity : 0 / data.recipe.yield, 10) + '   gr'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Protein </div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.PROCNT ? data.recipe.totalNutrients.PROCNT.quantity : 0 / data.recipe.yield, 10) + '   gr'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Cholesterol</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.CHOLE ? data.recipe.totalNutrients.CHOLE.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Sodium</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.NA ? data.recipe.totalNutrients.NA.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Calsium</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.CAL ? data.recipe.totalNutrients.CAL.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>

                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Magnesium</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.MAG ? data.recipe.totalNutrients.MAG.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Potassium</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.K ? data.recipe.totalNutrients.K.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-lg'>Iron</div>
                                <div className='font-semibold text-md'>{parseInt(data.recipe.totalNutrients.FE ? data.recipe.totalNutrients.FE.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Zinc</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.ZN ? data.recipe.totalNutrients.ZN.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Phosphorus</div>
                                <div className='font-semibold text-sm'>{parseInt(data.recipe.totalNutrients.P ? data.recipe.totalNutrients.P.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin A</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.VITA_RAE ? data.recipe.totalNutrients.VITA_RAE.quantity : 0 / data.recipe.yield, 10) + '   µg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin C</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.VITC ? data.recipe.totalNutrients.VITC.quantity : 0 / data.recipe.yield, 10) + '   µg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin B6</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.VITB6A ? data.recipe.totalNutrients.VITB6A.quantity : 0 / data.recipe.yield, 10) + '   µg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin B12</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.VITB12 ? data.recipe.totalNutrients.VITB12.quantity : 0 / data.recipe.yield, 10) + '   µg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin D</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.VITD ? data.recipe.totalNutrients.VITD.quantity : 0 / data.recipe.yield, 10) + '   µg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin K</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.VITK1 ? data.recipe.totalNutrients.VITK1.quantity : 0 / data.recipe.yield, 10) + '   µg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Vitamin E</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.TOCPHA ? data.recipe.totalNutrients.TOCPHA.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>
                            <div className='flex flex-row justify justify-between p-2'>
                                <div className='font-semibold text-md'>Water</div>
                                <div className='font-semibold text-2m'>{parseInt(data.recipe.totalNutrients.WATER ? data.recipe.totalNutrients.WATER.quantity : 0 / data.recipe.yield, 10) + '   mg'}</div>
                            </div>




                        </div>

                        <div onClick={() => setModal(false)} className='flex justify-end fixed p-2 cursor-pointer top-0 right-0 '>
                            <AiOutlineClose color={Colors.fontdark} size={24} />
                        </div>
                    </div>
                    :
                    <div></div>
            }







        </div>
    )
}

export default Modal
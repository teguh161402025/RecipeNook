"use client";
import Image from 'next/image'
import { FaSearch, FaArrowRight, FaArrowLeft, FaTired, FaAngleDown, FaArrowUp, FaBars } from 'react-icons/fa';
import Colors from '@/components/Colors';
import axios from 'axios';
import React, { useState, useEffect } from 'react'
import Loading from '@/components/Loading';
import Modal from '@/components/Modal';
import Footer from '@/components/Footer';
import backgroundImage from "../../public/assets/banner-search.jpg";

import 'animate.css';


export default function Home() {

  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [recipeData, setRecipeData] = useState([]);
  const [filterTab, setFilterTab] = useState(false);
  const [healthFilter, setHealthFilter] = useState([]);
  const [isSearch, setIsSearch] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [foodData, setDataFood] = useState();
  const [modal, setModal] = useState(false);
  const [toggle, setToggle] = useState(true);
  const [showComponent, setShowComponent] = useState(false);
  const [mobileNavToggle, setMobileNavToggle] = useState(false);
  const label = [
    "Alcohol-Cocktail",
    "Alcohol-Free",
    "Celery-Free",
    "Crustcean-Free",
    "Dairy-Free",
    "DASH",
    "Egg-Free",
    "Fish-Free",
    "FODMAP-Free",
    "Gluten-Free",
    "Immuno-Supportive",
    "Keto-Friendly",
    "Kidney-Friendly",
    "Kosher",
    "Low Potassium",
    "Low Sugar",
    "Lupine-Free",
    "Mediterranean",
    "Mollusk-Free",
    "Mustard-Free",
    "No oil added",
    "Paleo",
    "Peanut-Free",
    "Pescatarian",
    "Pork-Free",
    "Red-Meat-Free",
    "Sesame-Free",
    "Shellfish-Free",
    "Soy-Free",
    "Sugar-Conscious",
    "Sulfite-Free",
    "Tree-Nut-Free",
    "Vegan",
    "Vegetarian",
    "Wheat-Free"
  ];

  useEffect(() => {
    const option = {
      rootMargin: '0px',
      threshold: [0.3],
      once: true

    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((a, index) => {

        if (a.isIntersecting) {
          const animate = a.target.getAttribute('aniscroll');
          setTimeout(function () {
            a.target.classList.add('animate__animated', animate)

          }, 300);

          a.target.addEventListener('animationend', () => {
            a.target.classList.remove(animate);

          });




        }
      })

    }, option);

    const divElements = document.querySelectorAll('[aniscroll]');

    for (let i = 0; i < divElements.length; i++) {

      observer.observe(divElements[i]);
    }


  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY < 1) {
        setShowComponent(false);
      } else {
        setShowComponent(true);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  const foodTypeHandler = async (query) => {

    const url = `https://api.edamam.com/search?q=&mealType=${query}&from=0&to=100&app_id=ed889c22&app_key=649204cf22441ba92084e71cd71e0139`
    setIsLoading(true);
    await axios.get(url)
      .then((res) => {
        const getData = res.data.hits

        setRecipeData(getData);
        setIsSearch(true);

        setTimeout(() => {
          gotoHandler('search');
          setIsLoading(false);
        }, 2000

        )


      }).catch((err) => {
        console.log('error fetching', err)
      })
  }
  const dietHandler = async (query) => {

    const url = `https://api.edamam.com/search?q=&diet=${query}&from=0&to=100&app_id=ed889c22&app_key=649204cf22441ba92084e71cd71e0139`
    setIsLoading(true);
    await axios.get(url)
      .then((res) => {
        const getData = res.data.hits

        setRecipeData(getData);
        setIsSearch(true);

        setTimeout(() => {
          gotoHandler('search');
          setIsLoading(false);
        }, 2000

        )


      }).catch((err) => {
        console.log('error fetching', err)
      })
  }
  const filterHandler = async () => {
    setIsLoading(true);
    try {
      const dataFilter = recipeData.filter(a => { return healthFilter.every(b => a.recipe.healthLabels.includes(b)) })
      setRecipeData(dataFilter);
    }
    catch (err) {
      console.log(err)
    }


    setTimeout(() => {
      gotoHandler('search');
      setIsLoading(false);
      setFilterTab(false)
    }, 2000)

  }
  const apiHandler = async () => {

    const url = `https://api.edamam.com/search?q=${query}&from=0&to=100&app_id=ed889c22&app_key=649204cf22441ba92084e71cd71e0139`
    setIsLoading(true);
    await axios.get(url)
      .then((res) => {
        const getData = res.data.hits

        setRecipeData(getData);
        setIsSearch(true);

        setTimeout(() => {
          gotoHandler('search');
          setIsLoading(false);
        }, 2000

        )


      }).catch((err) => {
        console.log('error fetching', err)
      })

  }
  const handleRecipe = (data) => {
    try {
      setDataFood(data)

    }
    catch (err) {
      console.log(err)
    }
    const now = new Date();
    const seconds = now.getSeconds().toString().padStart(2, '0');
    setToggle(!toggle);
    setModal(true);

  }

  const nextHandler = () => {
    if (page * 10 < recipeData.length) {
      setPage(page + 1);
    }
    const searchElement = document.getElementById('search_result');

    searchElement.classList.add('animate__fadeOutLeft');

    searchElement.addEventListener('animationend', () => {
      searchElement.classList.remove('animate__fadeOutLeft');
    })

  }


  const prevHandler = () => {
    if (page > 1) {
      setPage(page - 1)
    }
    const searchElement = document.getElementById('search_result');

    searchElement.classList.add('animate__fadeOutRight');

    searchElement.addEventListener('animationend', () => {
      searchElement.classList.remove('animate__fadeOutRight');
    })

  }

  const gotoHandler = (ele) => {
    const element = document.getElementById(ele);
    element.scrollIntoView({ behavior: 'smooth' })

  }

  return (
    <>
      <main className='w-full overflow-hidden bg-fixed' style={{
        backgroundImage: `url(${backgroundImage.src})`,
      }}>
        {
          isLoading && <Loading />
        }

        <Modal data={foodData} closed={modal} togle={toggle} />

        <div onClick={() => gotoHandler('top')} className={`animate__animated  animate__fadeInUp bg-secondary rounded-xl cursor-pointer hover:bg-[#cf6300] transition-colors ease-in-out delay-200  shadow-lg fixed w-14 h-14 z-40 p-4 mt-[90vh] right-[5vw] ${showComponent ? 'block' : 'hidden'} `}>
          <FaArrowUp size={24} />
        </div>

        <div id='top' className='w-full relative'>
          <div className=' md:flex md:bg-primary md:min-h-screen '>
            <div className='text-lg absolute text-secondary font-bold p-6 xl:text-xl hidden md:block'>RecipeNook</div>
            <div className='text-fontdark p-6 md:pr-24 lg:pr-28 lg:pt-12 md:pt-[25vh] md:block hidden w-[60vw] md:rounded-tr-[5vw] bg-fontlight'>

              <div aniscroll='animate__slideInLeft' className='xl:p-[2vw]'>
                <div className='font-bold p-4 text-2xl lg:text-6xl xl:text-[4vw]  lg:font-extrabold'><p className='text-secondary md:text-[3vw]'>Search, Cook, Serve:</p> Delicious Recipes at Your Fingertips</div>
                <p className='p-4 text-md xl:text-[1.5vw] md:w-[40vw]'>Discover recipes based on the ingredients you have in your fridge and get creative in the kitchen</p>
                <button onClick={() => gotoHandler('searchinput')} className='bg-secondary text-fontlight p-4 ml-2 rounded-tr-lg rounded-bl-lg mt-8 shadow-lg xl:text-[1.5vw] hover:bg-[#cf6300] transition-colors ease-in-out delay-100'>Exploration Begins</button>
              </div>



            </div>
            <div className='md:hidden block bg-primary py-6'>
              <div className='text-lg text-secondary font-bold px-4 flex space-x-4'>
                <div onClick={() => setMobileNavToggle(!mobileNavToggle)} className={`animate__animated p-2 ${mobileNavToggle ? 'bg-fontlight text-secondary animate__fadeIn' : 'bg-primary text-fontlight'}`} >
                  <FaBars size={24} />
                </div>

                <div className='py-2'>
                  RecipeNook
                </div>

              </div>
              <div className={`animate__animated absolute z-20 bg-fontlight space-y-2 p-4 ml-4 w-44 mt-[-3px] rounded-tr-lg ${mobileNavToggle ? 'block animate__fadeInDown' : 'hidden'} `}>
                <div onClick={() => gotoHandler('cuisine')} className='text-secondary cursor-pointer font-semibold'>Cuisine</div>
                <div onClick={() => gotoHandler('diet')} className='text-secondary cursor-pointer font-semibold'>Diet</div>
                <div onClick={() => gotoHandler('searchinput')} className='text-secondary cursor-pointer font-semibold'>Recipe</div>
              </div>
              <div className=' relative bg-primary w-full pt-16 flex justify-between md: md:rounded-bl-[100px]'>

                <Image
                  src="/assets/banner-photo.png"
                  width={250}
                  height={250}
                  alt="food recipe salad recipe "
                  priority='true'
                  style={{ width: 'auto', height: 'auto' }}
                />
                <div className='absolute right-0 -rotate-90 h-fit  text-6xl  font-bold text-ornament  mb-4 pt-[20%] mt-12'>Recipe</div>
              </div>
            </div>


            <div className='md:block hidden bg-fontlight w-[40vw] relative'>
              <div className='absolute md:w-[40vw] bg-primary rounded-bl-[5vw] h-full ' >
                <div className='flex flex-row md:text-lg xl:text-xl font-bold space-x-6 p-6 justify-end'>
                  <div onClick={() => gotoHandler('cuisine')} className='hover:text-secondary cursor-pointer transition-colors ease-out delay-100'>Cuisine</div>
                  <div onClick={() => gotoHandler('diet')} className='hover:text-secondary cursor-pointer transition-colors ease-out delay-100'>Diet</div>
                  <div onClick={() => gotoHandler('searchinput')} className='hover:text-secondary cursor-pointer transition-colors ease-out delay-100'>Recipe</div>
                </div>
                <div className='ml-[20vw] ] md:text-[120px] mt-[40vh] -rotate-90 h-fit  lg:text-[25vh]  font-bold text-ornament  mb-4 pt-[20%] mt-12'>Recipe</div>
              </div>
            </div>
            <div aniscroll='animate__zoomIn' className='absolute md:block hidden mx-[45vw]  mt-[15vh] w-[30vw] '>

              <Image
                src="/assets/banner-photo.png"
                width={400}
                height={400}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt="food recipe salad recipe"
                loading='lazy'

              />
            </div>


            <div className=' text-fontdark text-center p-6 md:hidden block'>

              <div className='font-semibold p-4 '><p className='text-secondary'>Search, Cook, Serve:</p> Delicious Recipes at Your Fingertips</div>
              <p className='text-sm'>Discover recipes based on the ingredients you have in your fridge and get creative in the kitchen</p>
              <button onClick={() => gotoHandler('searchinput')} className='bg-secondary text-fontlight p-4 rounded-tr-lg rounded-bl-lg mt-12 shadow-lg'>Exploration Begins</button>
            </div>
          </div>
        </div>

        <div className='bg-fontlight min-h-screen'>
          <div id='cuisine' className='py-12  xl:mp-[4vw] bg-fontlight'>
            <div className='text-secondary text-center font-bold p-2 text-3xl xl:text-[2vw]'>
              <p>Cuisine Type</p>
            </div>
            <div className='text-fontdark text-center p-2 xl:pt-[1vw]  text-md xl:text-[1vw]'>
              <p>Find the perfect recipe to satisfy your cravings. Search for dishes categorized by cuisine type</p>
            </div>
            <div aniscroll='animate__fadeInUp' className='grid grid-cols-2 gap-y-2 md:flex md:divide-x-2 md:p-8 p-2 text-center text-secondary font-semibold text-md xl:text-[1.5vw] xl:py-[5vw] xl:px-[10vw]'>
              <div onClick={() => foodTypeHandler('Breakfast')} className=' p-8 lg:p-12 hover:shadow-xl transition-transform duration-300 hover:scale-105 bg-fontlight cursor-poi cursor-pointernter'>
                <Image className='w-[30vw]'
                  src="/assets/breakfast.png"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw"
                  alt='food recipe for breakfast '
                />
                <span >Breakfast</span>

              </div>
              <div onClick={() => foodTypeHandler('Brunch')} className='p-8 lg:p-12 hover:shadow-xl transition-transform duration-300 hover:scale-105  bg-fontlight cursor-poi cursor-pointernter'>
                <Image className='p-2 w-[30vw]'
                  src="/assets/brunch.png"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw"
                  alt='food recipe for  brunch'
                />
                <span>Brunch</span>
              </div>
              <div onClick={() => foodTypeHandler('dinner')} className='p-8 lg:p-12 hover:shadow-xl transition-transform duration-300 hover:scale-105  bg-fontlight cursor-poi cursor-pointernter'>
                <Image className='w-[30vw]'
                  src="/assets/lunch-dinner.png"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw"
                  alt='food recipe for dinner'
                />
                <span>Lunch / Dinner</span>
              </div>
              <div onClick={() => foodTypeHandler('snack')} className='p-8 hover:shadow-xl transition-transform duration-300 hover:scale-105  bg-fontlight cursor-poi cursor-pointernter'>
                <Image className='w-[30vw]'
                  src="/assets/snack.png"
                  width={500}
                  height={500}
                  sizes="(max-width: 768px) 100vw"
                  alt='food recipe for snack'
                />
                <span>Snack</span>
              </div>

            </div>

          </div>
        </div>
        <div className='bg-fontlight'>
          <div className='flex flex-row relative w-full md:h-[35vw]  '>
            <div className='bg-fontlight w-[25vw]  relative h-f ull '>
              <div className='bg-primary h-full  md:rounded-br-[100px] ' >

                <Image aniscroll='animate__slideInLeft' className='absolute lg:right-[-25vh] md:right-[-10vh] my-[10vh] hidden md:block xl:w-[40vw]'
                  src="/assets/banner-3.png"
                  width={400}
                  height={400}
                  sizes="(max-width: 768px) 100vw"
                  alt='banner'
                  loading='lazy'
                  style={{ width: 'auto', height: 'auto' }}
                />


              </div>
            </div>


            <div className='bg-primary md:w-[60vw]'>
              <div className='bg-fontlight md:rounded-tl-[100px] md:rounded-br-[100px] h-full flex justify-center items-center'>

                <div aniscroll='animate__zoomIn' className='  lg:py-12 xl:px-[12vw] md:p-4 md:pl-16 px-4 lg:ml-24 xl:space-y-8 space-y-4 md:space-y-2 h-full  rounded-tl-xl'>
                  <div className='text-fontdark font-bold lg:text-3xl text-xl md:text-xl text-center md:text-left xl:text-[2vw] xl:leading-[2vw]'><p className='text-secondary'> Discover Your
                    Ideal Diet </p> with Our Specialized Recipe Collection</div>
                  <div className='flex justify-center'>
                    <Image className='md:hidden'
                      src="/assets/banner-3.png"
                      width={300}
                      height={300}
                      alt='banner'
                      loading='lazy'
                      style={{ width: 'auto', height: 'auto' }}
                    />
                  </div>

                  <p className='text-fontdark md:text-md text-sm xl:text-[1vw] xl:leading-[1.5vw]'>
                    Maintaining a healthy diet is essential for overall well-being, as everyoness nutritional needs differ.
                    To simplify your quest for meals that suit your specific diet,
                    our website offers a diverse range of categorized recipes.
                    Whether you follow a vegetarian, vegan, low-carb, or low-calorie diet,
                    you can discover numerous options to support your nutritional preferences.
                    Take the first step towards a healthier lifestyle by exploring our website
                    for the perfect meal that aligns with your dietary requirements.</p>
                </div>
              </div>

            </div>
            <div className='bg-primary h-full w-[20vw] hidden md:block rounded-tl-[100px] relative'>
              <Image aniscroll='animate__slideInRight' className='hidden md:block right-0 my-[10vh] absolute xl:w-[40vw]'
                src="/assets/banner-2.png"
                width={300}
                height={300}
                sizes="(max-width: 768px) 100vw"
                alt='banner'
                loading='lazy'
              />
            </div>
          </div>
        </div>
        <div className='bg-fontlight min-h-screen'>
          <div aniscroll='animate__zoomIn' id='diet' className='grid grid-cols-3 gap-2 py-24 xl:gap-[1vw] xl:py-[5vw]  px-2 lg:px-12 xl:px-44 xl:h-[90vh]'>

            <div onClick={() => dietHandler('balanced')} className='relative  md:col-span-1 col-span-2 group overflow-hidden md:h-[250px] h-[150px] xl:h-full cursor-pointer'>
              <Image className='group-hover:scale-125 hover:transform transition-transform duration-300 ease-in-out'
                src="/assets/balance.jpg"
                fill
                loading='lazy'
                style={{
                  objectFit: "cover",
                }}
                alt='balance diet food recipe'
              />
              <div className='absolute w-full h-full opacity-70 from-fontdark bg-gradient-to-t top-0 z-10'>

              </div>
              <div className='text-secondary absolute bottom-0 font-semibold z-20 p-2 xl:text-[1.5vw] xl:p-[1vw] cursor-pointer'>
                <p>Balanced</p>
                <p className='text-[11px]  xl:text-[1vw]  text-fontlight'>	Protein/Fat/Carb values in 15/35/50 ratio</p>
              </div>
            </div>
            <div onClick={() => dietHandler('high-fiber')} className='relative group overflow-hidden cursor-pointer '>
              <Image
                className='group-hover:scale-125 hover:transform transition-transform duration-300 ease-in-out w-full'
                src="/assets/high-fibre.jpg"
                fill
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                loading='lazy'
                style={{ objectFit: "cover" }}
                alt='high fiber diet food recipe'

              />
              <div className='absolute w-full h-full opacity-70  from-fontdark bg-gradient-to-b top-0 '>
              </div>
              <div className='text-secondary absolute top-0 font-semibold z-20 p-2 xl:text-[1.5vw]  xl:p-[1vw]'>
                <p>High Fiber</p>
                <p className='text-[11px] text-fontlight xl:text-[1vw]'>More than 5g fiber per serving</p>
              </div>
            </div>





            <div onClick={() => dietHandler('high-protein')} className='relative md:h-[250px] h-[150px] cursor-pointer xl:h-full group overflow-hidden'>
              <Image
                className='group-hover:scale-125 hover:transform transition-transform duration-300 ease-in-out'
                src="/assets/high-protein.jpg"
                fill
                loading='lazy'
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='high protein diet food recipe'
              />
              <div className='absolute w-full h-full opacity-70  from-fontdark bg-gradient-to-b top-0 '>
              </div>
              <div className='text-secondary absolute top-0 font-semibold z-20 p-2 xl:text-[1.5vw]  xl:p-[1vw]'>
                <p>High Protein</p>
                <p className='text-[11px] text-fontlight xl:text-[1vw]'>	More than 50% of total calories from proteins</p>
              </div>

            </div>

            <div onClick={() => dietHandler('low-carb')} className='relative cursor-pointer  md:col-span-1 col-span-2 group overflow-hidden'>
              <Image
                className='group-hover:scale-125 hover:transform transition-transform duration-300 ease-in-out'
                src="/assets/low-carb.jpg"
                fill
                loading='lazy'
                style={{ objectFit: "cover" }}
                alt='low carb diet food recipe'

              />
              <div className='absolute w-full h-full opacity-70  from-fontdark bg-gradient-to-t top-0 '>
              </div>
              <div className='text-secondary absolute bottom-0 font-semibold z-20 p-2 xl:text-[1.5vw]  xl:p-[1vw]'>
                <p>High carbs</p>
                <p className='text-[11px] text-fontlight xl:text-[1vw]'>Less than 20% of total calories from carbs</p>
              </div>
            </div>




            <div onClick={() => dietHandler('low-fat')} className='relative cursor-pointer col-span-2 md:col-span-1 group overflow-hidden'>
              <Image
                className='group-hover:scale-125 hover:transform transition-transform duration-300 ease-in-out'
                src="/assets/low-fat.jpg"
                fill
                loading='lazy'
                style={{ objectFit: "cover" }}
                alt='low fat diet food recipe'
              />
              <div className='absolute w-full h-full opacity-70  from-fontdark bg-gradient-to-b top-0 '>
              </div>
              <div className='text-secondary absolute top-0 font-semibold z-20 p-2 xl:text-[1.5vw]  xl:p-[1vw]'>
                <p>Low Fat</p>
                <p className='text-[11px] text-fontlight xl:text-[1vw]'>	Less than 15% of total calories from fat</p>
              </div>
            </div>

            <div onClick={() => dietHandler('low-sodium')} className='relative cursor-pointer  md:h-[250px] xl:h-full h-[150px] group overflow-hidden  '>
              <Image className='group-hover:scale-125 hover:transform transition-transform duration-300 ease-in-out'
                src="/assets/low-sodium.jpeg"
                fill
                loading='lazy'
                style={{ objectFit: "cover" }}
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                alt='low sodium diet food recipe'
              />
              <div className='absolute w-full h-full opacity-70  from-fontdark bg-gradient-to-b top-0 '>
              </div>
              <div className='text-secondary absolute top-0 font-semibold z-20 p-2 xl:text-[1.5vw]  xl:p-[1vw]'>
                <p>Low Sodium</p>
                <p className='text-[11px] text-fontlight xl:text-[1vw]'>Less than 140mg Na per serving</p>
              </div>
            </div>
          </div>
        </div>



        <div id='searchinput' className='relative min-h-screen'>

          <div className='absolute inset-0 w-full bg-fontdark min-h-screen opacity-70 '></div>
          <div className='absolute z-5 inset-0 text-center text-fontlight p-6 w-full  mt-8 space-y-8 xl:p-[4vh] xl:py-[4vh] md:max-w-[60vw] left-1/2 transform -translate-x-1/2 '>
            <p aniscroll='animate__fadeInDown' className='font-semibold md:text-xl xl:text-[1.5vw] xl:leading-[2vw] text-primary'>Begin your search for recipe inspiration based on the ingredients in your kitchen and bring delicious dishes to life.</p>

            <div aniscroll='animate__fadeInUp' className='text-fontdark bg-fontlight rounded-lg py-8 px-8  bg-fontlight h-[200px] xl:h-[20vh] xl:py-[4vh] xl:space-y-[3vh]'>
              <p className='tetx-fontlight text-sm xl:text-[1vw]'>Search recipes by entering ingredients like chicken, broccoli, cheese, and tomatoes</p>

              <div className='flex flex-row px-2 justify-center mt-12 '>
                <input onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    apiHandler();

                  }
                }} value={query} onChange={(e) => setQuery(e.target.value)} placeholder='e.g chicken, broccoli, cheese, and tomatoes' className='bg-white rounded-bl-md ring-primary focus:outline-none h-10 xl:h-[5vh] p-2 shadow-lg w-2/3 xl:text-[1vw]' />

                <div onClick={() => apiHandler()} className='p-2 bg-primary px-4 flex items-center rounded-tr-lg pointer hover:bg-secondary transition-colors ease-in-out delat-300 cursor-pointer'>
                  <FaSearch className='xl:text-[1.5vw]' color={Colors.fontlight} />
                </div>

              </div>




            </div>
          </div>



        </div>
        <div id='search' className={`${isSearch == true ? 'block' : 'hidden'} w-full bg-fontlight py-4 animate__animated`}>

          {
            recipeData.length > 0 ?
              <div>
                <div onClick={() => filterTab == true ? setFilterTab(false) : setFilterTab(true)} className='bg-white text-secondary shadow-md rounded-br-xl rounded-tl-xl mx-4 mt-4 p-2'>
                  <div className='flex flex-row w-full justify-between'><p className='font-semibold text-md '>Filter</p>
                    <div ><FaAngleDown size={22} /></div>

                  </div>

                </div>

                <div className={` text-sm  mx-4 mt-[-10px] p-2 bg-white rounded-br-xl shadow-lg filter-content  ${filterTab == true ? ' h-[600px]' : 'h-[0px]'}`}>

                  {
                    filterTab == true ?
                      <div className={`animate__animated grid grid-cols-3 gap-y-4 ${filterTab == true ? 'animate__slideInDown' : 'slideup'}`} >{
                        label.map((a, index) =>
                          <div onClick={() => {
                            if (healthFilter.includes(a)) {

                              setHealthFilter(healthFilter.filter(b => b !== a));
                            } else {

                              setHealthFilter([...healthFilter, a]);
                            }
                          }} className={` rounded-lg ${healthFilter.includes(a) ? 'text-secondary' : ' text-fontdark '}  px-2 `} key={index}>

                            {
                              a.replace(/-/g, ' ')}</div>
                        )
                      }
                      </div> : ''


                  }
                  <div className={`flex justify-end  ${filterTab == true ? 'block slidedown' : 'hidden'}`}>
                    <div onClick={() => filterHandler()} className='bg-secondary p-2 rounded-br-xl  rounded-tl-xl m-4'>
                      Apply
                    </div>

                  </div>
                </div>
                <div>Result for {query ? query : ''}</div>
              </div> : <div></div>
          }
          <div className='md:hidden '>
            {
              recipeData.length == 0 && isSearch == true ? <div className='py-16 space-y-6'>

                <div className='text-gray-500 text-center '>Recipe not found </div>
                <div className='flex justify-center'> <FaTired color='gray' size={44} /></div>
              </div> :


                <div className='grid grid-cols-2 w-full mt-8'>

                  <div className='text-fontdark flex flex-wrap justify-center p-2 w-full space-y-6  px-6'>{
                    recipeData.length > 0 ?

                      recipeData.slice((page * 10) - 10, (page * 10) - 5).map((a, index) =>

                        <div onClick={() => handleRecipe(a)} className='relative h-fit cursor-pointer' key={index}>
                          <Image className='absolute z-5 shadow-lg mx-[30px]  rounded-bl-xl rounded-tr-xl'
                            src={a.recipe.image}
                            width={120}
                            height={120}
                            alt={a.recipe.label}
                            loading="lazy"
                          />
                          <div className='bg-white border-[2px] border-primary shadow-xl h-fit w-[170px] bottom-0 mt-[65px] rounded-tl-xl rounded-br-xl'>
                            <p className='pt-16 text-sm font-semibold text-center px-2'>{
                              a.recipe.label
                            }</p>

                            <div className='px-4 flex flex-row justify-around py-2'>
                              <div className=' font-semibold text-center'>
                                <p className='text-lg'>{parseInt(a.recipe.yield, 10)}</p>
                                <p className='text-sm'>Servings</p>
                              </div>
                              <div className='text-lg font-semibold text-center '>
                                <p>{parseInt(a.recipe.calories / a.recipe.yield, 10)}</p>
                                <p className='text-sm'>Kcal</p>
                              </div>
                            </div>
                            <div className='flex flex-row bg-secondary justify-around text-sm text-fontlight m-2 p-2 rounded-tl-xl rounded-br-xl shadow-md' >
                              <div className='text-center'>
                                <p className='font-semibold'>Protein</p>
                                <p>{parseInt(a.recipe.totalNutrients.PROCNT.quantity / a.recipe.yield, 10) + 'g'}</p>
                              </div>
                              <div className='text-center'>
                                <p className='font-semibold'>Fat</p>
                                <p>{parseInt(a.recipe.totalNutrients.FAT.quantity / a.recipe.yield, 10) + 'g'}</p>
                              </div>
                              <div className='text-center'>
                                <p className='font-semibold'>Carbo</p>
                                <p>{parseInt(a.recipe.totalNutrients.CHOCDF.quantity / a.recipe.yield, 10) + 'g'}</p>
                              </div>
                            </div>
                            <div className='flex flex-wrap p-4'>

                              {


                                <div className='text-fontdark text-[10px] font-semibold text-center' >
                                  {
                                    a.recipe.healthLabels.map((a, index) =>
                                      a.replace(/-/g, ' ') + ' • '
                                    )
                                  }
                                </div>

                              }
                            </div>
                          </div>



                        </div>
                      ) : <div></div>
                  }</div>
                  <div className='text-fontdark flex flex-wrap justify-center p-6 w-full space-y-6 w-1/2'>{
                    recipeData.length > 0 ? recipeData.slice((page * 10) - 5, page * 10).map((a, index) =>

                      <div onClick={() => handleRecipe(a)} className='relative h-fit ' key={index}>
                        <Image className='absolute z-5 shadow-lg mx-[30px] rounded-tl-xl rounded-br-xl'
                          src={a.recipe.image}
                          width={120}
                          height={120}
                          alt={a.recipe.label}
                          loading='lazy'
                        />
                        <div className='bg-white border-[2px] border-primary shadow-xl h-fit w-[170px] bottom-0 mt-[65px] rounded-bl-xl rounded-tr-xl '>
                          <p className='pt-16 text-sm font-semibold text-center px-2'>{
                            a.recipe.label
                          }</p>
                          <div className='px-4 flex flex-row justify-around py-2'>
                            <div className=' font-semibold text-center'>
                              <p className='text-lg'>{parseInt(a.recipe.yield, 10)}</p>
                              <p className='text-sm'>Servings</p>
                            </div>
                            <div className='text-lg font-semibold text-center '>
                              <p>{parseInt(a.recipe.calories / a.recipe.yield, 10)}</p>
                              <p className='text-sm'>Kcal</p>
                            </div>
                          </div>
                          <div className='flex flex-row bg-secondary justify-around text-sm text-fontlight m-2 p-2 rounded-bl-xl rounded-tr-xl shadow-md' >
                            <div className='text-center'>
                              <p className='font-semibold'>Protein</p>
                              <p>{parseInt(a.recipe.totalNutrients.PROCNT.quantity / a.recipe.yield, 10) + 'g'}</p>
                            </div>
                            <div className='text-center'>
                              <p className='font-semibold'>Fat</p>
                              <p>{parseInt(a.recipe.totalNutrients.FAT.quantity / a.recipe.yield, 10) + 'g'}</p>
                            </div>
                            <div className='text-center'>
                              <p className='font-semibold'>Carbo</p>
                              <p>{parseInt(a.recipe.totalNutrients.CHOCDF.quantity / a.recipe.yield, 10) + 'g'}</p>
                            </div>
                          </div>
                          <div className='flex flex-wrap p-4'>

                            {


                              <div className='text-fontdark text-[10px] font-semibold text-center' key={index}>
                                {
                                  a.recipe.healthLabels.map((a, index) =>
                                    a.replace(/-/g, ' ') + ' • '
                                  )
                                }
                              </div>

                            }
                          </div>
                        </div>



                      </div>
                    ) : <div></div>
                  }</div>
                </div>
            }
          </div>
          <div id='search_result' className='md:block hidden animate__animated'>

            {

              recipeData.length == 0 && isSearch == true ? <div className='py-16 space-y-6'>

                <div className='text-gray-500 text-center '>Recipe not found </div>
                <div className='flex justify-center'> <FaTired color='gray' size={44} /></div>
              </div> :


                <div className='xl:mx-auto xl:container flex mt-8 justify-center md:mx-4 xl:pl-4'>

                  <div className='text-fontdark grid grid-cols-3 gap-8 justify-items-center w-full w-full'>
                    <div className='py-16 space-y-6 w-full text-fontdark'>

                      <div className='text-gray-500 text-center  text-fontdark '>Recipe not found </div>
                      <div className='flex justify-center text-fontdark '> <FaTired color='gray' size={44} /></div>
                    </div>
                    {
                      recipeData.length > 0 ?

                        recipeData.slice((page * 10) - 10, (page * 10) - 4).map((a, index) =>

                          <div onClick={() => handleRecipe(a)} className='relative h-fit cursor-pointer ' key={index}>
                            <Image className='absolute z-5 shadow-lg mx-[30px]  rounded-bl-xl rounded-tr-xl'
                              src={a.recipe.image}
                              width={120}
                              height={120}
                              alt={a.recipe.label}
                              loading="lazy"
                            />
                            <div className='bg-white lg:flex lg:flex-row border-[2px] border-primary shadow-xl  w-full  bottom-0 mt-[65px] rounded-tl-xl rounded-br-xl'>
                              <div>
                                <p className='pt-16 text-sm font-semibold text-center px-2'>{
                                  a.recipe.label
                                }</p>

                                <div className='px-4 flex flex-row justify-around py-2'>
                                  <div className=' font-semibold text-center'>
                                    <p className='text-lg'>{parseInt(a.recipe.yield, 10)}</p>
                                    <p className='text-sm'>Servings</p>
                                  </div>
                                  <div className='text-lg font-semibold text-center '>
                                    <p>{parseInt(a.recipe.calories / a.recipe.yield, 10)}</p>
                                    <p className='text-sm'>Kcal</p>
                                  </div>
                                </div>
                                <div className='flex flex-row bg-secondary justify-around text-sm text-fontlight m-2 p-2 rounded-tl-xl rounded-br-xl shadow-md' >
                                  <div className='text-center'>
                                    <p className='font-semibold'>Protein</p>
                                    <p>{parseInt(a.recipe.totalNutrients.PROCNT.quantity / a.recipe.yield, 10) + 'g'}</p>
                                  </div>
                                  <div className='text-center'>
                                    <p className='font-semibold'>Fat</p>
                                    <p>{parseInt(a.recipe.totalNutrients.FAT.quantity / a.recipe.yield, 10) + 'g'}</p>
                                  </div>
                                  <div className='text-center'>
                                    <p className='font-semibold'>Carbo</p>
                                    <p>{parseInt(a.recipe.totalNutrients.CHOCDF.quantity / a.recipe.yield, 10) + 'g'}</p>
                                  </div>
                                </div>
                              </div>

                              <div className='flex flex-wrap p-4'>

                                {


                                  <div className='text-fontdark text-[10px] xl:text-md font-semibold text-center' key={index}>
                                    {
                                      a.recipe.healthLabels.map((a, index) =>
                                        a.replace(/-/g, ' ') + ' • '
                                      )
                                    }
                                  </div>

                                }
                              </div>
                            </div>



                          </div>
                        ) : <div></div>
                    }</div>

                </div>
            }
          </div>
        </div>
        {
          recipeData.length > 0 ?
            <div className='bg-fontlight w-full'>

              <div className='flex flex-arrow justify-center container mx-auto p-4 space-x-4 '>
                <div onClick={() => prevHandler()} className='bg-primary hover:hover:bg-[#cf6300] transition-colors tarnsform aese-in-out delay-200 cursor-pointer p-2 rounded-l-lg shadow-md pointer'>  <FaArrowLeft size={24} /></div>
                <div className='text-fontdark font-bold py-2'>{
                  page
                }</div>
                <div onClick={() => nextHandler()} className='bg-primary hover:hover:bg-[#cf6300] transition-colors tarnsform aese-in-out delay-200 cursor-pointer p-2 rounded-r-lg shadow-md pointer'>  <FaArrowRight size={24} /></div>
              </div></div>
            : <div className='hidden'></div>
        }

      </main>
      <Footer />
    </>
  )
}

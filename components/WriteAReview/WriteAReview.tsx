import { useState, BaseSyntheticEvent } from 'react'
import { AnimatePresence } from 'framer-motion'
import axios from 'axios'
import dictionary from '../../dictionary.json'
import { isValidEmailCheck } from '../../utils/form'
import {
  StyledRow,
  StyledInputContainer,
  StyledHeading,
  StyledSleeperContainer,
  StyledForm,
  StyledSubmitButton,
  StyledClose,
  StyledRating,
  StyledStars,
  StyledButtonContainer,
  StyledSleeperSubheading,
  StyledRatingSubheading,
  StyledMotionDiv,
  StyledErrorMessageSpan,
  StyledServerErrorMessage
} from './WriteAReview.styled'
import { Controller, useForm } from 'react-hook-form'
import { Locale } from '../../types/global-types'
import { Text } from '../Text'
import { InputTooltip } from '../Tooltip'
import { Dropdown } from '../Dropdown'
import { TextInput } from './TextInput'
import { RadioInput } from './RadioInput'
import { ProductPdpProps } from '../CustomerReviews'

interface DataProps {
  review_score: string
  review_title: string
  review_content: string
  email: string
  display_name: string
  custom_properties: {
    sleeping_position: string
  }
  customer_metadata: {
    state: string
  }
}

interface OptionsProps extends Omit<DataProps, 'review_score'> {
  sku: string
  product_title: string
  product_url: string
  review_score: number
}

export interface ProductDropdownProps {
  label: string
  id: string
  slug: string
}

interface WriteAReviewProps {
  locale: Locale
  productDropdown?: ProductPdpProps | ProductDropdownProps[]
  showReviewForm: boolean
  setShowReviewForm: (param: boolean) => void
}

const Star = ({ fill }: { fill: string }) => {
  return (
    <svg
      width='24px'
      height='23px'
      viewBox='0 0 24 23'
      version='1.1'
      xmlns='http://www.w3.org/2000/svg'
    >
      <g
        id='Icons'
        stroke='none'
        strokeWidth='1'
        fill={fill}
        fillRule='evenodd'
        strokeLinecap='round'
        strokeLinejoin='round'
      >
        <g
          id='illustrative-icons---28x28'
          transform='translate(-429.000000, -274.000000)'
          stroke='#FFD258'
          strokeWidth='1.5'
        >
          <g id='cart' transform='translate(427.000000, 241.000000)'>
            <g id='star-fill' transform='translate(0.000000, 30.000000)'>
              <polygon points='14 21.0803686 7.47467044 24.5109374 8.72089749 17.2448761 3.44179498 12.099023 10.7373352 11.0389189 14 4.42803802 17.2626648 11.0389189 24.558205 12.099023 19.2791025 17.2448761 20.5253296 24.5109374'></polygon>
            </g>
          </g>
        </g>
      </g>
    </svg>
  )
}

const closeIcon =
  'https://cdn.sanity.io/images/d0kd7r9c/production/7c498bc282aed9b4c6685490068af6f2cc4c2e56-48x48.svg'

export const WriteAReview = ({
  locale,
  productDropdown,
  showReviewForm,
  setShowReviewForm
}: WriteAReviewProps) => {
  const localizedDictionary = dictionary[locale]

  const [emailTooltipErrorMessage, setEmailTooltipErrorMessage] = useState('')
  const [titleTooltipErrorMessage, setTitleTooltipErrorMessage] = useState('')
  const [reviewTooltipErrorMessage, setReviewTooltipErrorMessage] = useState('')
  const [nameTooltipErrorMessage, setNameTooltipErrorMessage] = useState('')
  const [productTooltipErrorMessage, setProductTooltipErrorMessage] =
    useState('')
  const [ratingTooltipErrorMessage, setRatingTooltipErrorMessage] = useState('')
  const [serverErrorMessage, setServerErrorMessage] = useState('')
  const [buttonMessage, setButtonMessage] = useState(
    localizedDictionary.submitReview
  )
  const [productData, setProductData] = useState({
    title: '',
    url: '',
    id: ''
  })

  const [name, setName] = useState('')
  const [customerEmail, setCustomerEmail] = useState('')

  const [count, setCount] = useState(0)

  const { handleSubmit, register, reset, control } = useForm({
    shouldUseNativeValidation: false
  })

  const postToYopto = async (options: OptionsProps) => {
    try {
      const response = await axios.post('/api/yotpo/submit-review', options)

      const {
        data: { code }
      } = response

      if (code !== 200) {
        return setServerErrorMessage(localizedDictionary.serverError)
      }

      setButtonMessage(localizedDictionary.thankYou)

      setTimeout(() => {
        setButtonMessage(localizedDictionary.submitReview)
        reset()
      }, 3000)
    } catch (err) {
      console.error('Error in onSubmit:', err)
    }
  }

  const handleErrorMessaging = (options: OptionsProps) => {
    const {
      email,
      review_title,
      review_content,
      display_name,
      sku,
      review_score
    } = options
    setEmailTooltipErrorMessage(
      isValidEmailCheck(email) ? '' : localizedDictionary.emailError
    )
    setTitleTooltipErrorMessage(
      review_title ? '' : localizedDictionary.titleError
    )
    setReviewTooltipErrorMessage(
      review_content ? '' : localizedDictionary.reviewError
    )
    setNameTooltipErrorMessage(
      display_name ? '' : localizedDictionary.nameError
    )
    setProductTooltipErrorMessage(sku ? '' : localizedDictionary.productError)
    setRatingTooltipErrorMessage(
      review_score ? '' : localizedDictionary.ratingError
    )
  }

  const onSubmit = (
    data: DataProps,
    e: BaseSyntheticEvent<object, any, any> | undefined,
    productDropdown: ProductPdpProps
  ) => {
    e?.preventDefault()

    const options = {
      ...data,
      display_name: name,
      email: customerEmail,
      review_score: parseInt(data.review_score),
      sku: productData.id ? productData.id : productDropdown.id,
      product_title: productData.title
        ? productData.title
        : productDropdown.label,
      product_url: productData.url ? productData.url : productDropdown.slug
    }

    const {
      sku,
      product_title,
      product_url,
      display_name,
      email,
      review_content,
      review_title,
      review_score
    } = options

    const doAllRequiredFieldsExist =
      sku &&
      product_title &&
      product_url &&
      display_name &&
      isValidEmailCheck(email) &&
      review_content &&
      review_title &&
      review_score

    if (doAllRequiredFieldsExist) {
      postToYopto(options)
    } else {
      handleErrorMessaging(options)
    }
  }

  const handleProductSelection = (selectedOption: string) => {
    const enDomain = 'https://www.endy.com/products'
    const frDomain = 'https://www.endy.com/fr/products'

    const selectedProduct =
      Array.isArray(productDropdown) &&
      productDropdown.find((option) => {
        return option.id === selectedOption
      })

    selectedProduct &&
      setProductData({
        title: selectedProduct?.label ? selectedProduct?.label : '',
        url:
          locale === 'en'
            ? `${enDomain}${selectedProduct.slug}`
            : `${frDomain}${selectedProduct.slug}`,
        id: selectedProduct.id
      })
  }

  return (
    <>
      {/* TODO: Add prefers reduced motion check */}
      <AnimatePresence initial={false}>
        {showReviewForm && (
          <StyledMotionDiv
            initial='collapsed'
            animate='expanded'
            exit='collapsed'
            variants={{
              expanded: { height: 'auto' },
              collapsed: { height: 0 }
            }}
            transition={{ duration: 0.5, ease: 'linear' }}
            showReviewForm={showReviewForm}
            id='write-a-review'
          >
            <StyledHeading variant='h3' color='gravy' element='h2'>
              {localizedDictionary.writeAReview}
            </StyledHeading>

            <StyledClose
              onClick={() => setShowReviewForm(!showReviewForm)}
              aria-label={localizedDictionary.closeCartButton}
              aria-expanded={showReviewForm}
              showReviewForm={showReviewForm}
            >
              {/* TODO: Update the icon to the Icon component when ready */}
              <img src={closeIcon} alt='' />
            </StyledClose>

            <StyledRating>
              <StyledRatingSubheading
                color='gravy'
                variant='mediumBody'
                element='p'
              >
                {localizedDictionary.yourRating}
              </StyledRatingSubheading>

              <Controller
                name={'review_score'}
                control={control}
                render={({ field: { onChange, value } }) => (
                  <StyledStars
                    defaultValue={0}
                    onChange={onChange}
                    onClick={(e) => {
                      if (ratingTooltipErrorMessage) {
                        setRatingTooltipErrorMessage('')
                      }
                    }}
                    value={value ? value : ''}
                    emptyIcon={<Star fill='none' />}
                    icon={<Star fill='#FFD258' />}
                  />
                )}
              />

              <InputTooltip
                showTooltip={!!ratingTooltipErrorMessage}
                top='78px'
                left='50%'
                isInline={false}
              >
                {/*TODO: update icon to  Icon component when it is ready*/}
                <img
                  src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                  alt=''
                />
                <StyledErrorMessageSpan>
                  <strong>{ratingTooltipErrorMessage}</strong>
                </StyledErrorMessageSpan>
              </InputTooltip>
            </StyledRating>

            <StyledForm
              onSubmit={handleSubmit((...params) =>
                //@TODO: Fix non-critical typescript bug, for now ignore.
                //@ts-ignore
                onSubmit(...params, productDropdown)
              )}
            >
              <StyledRow>
                <StyledInputContainer productDropdown={productDropdown}>
                  <label htmlFor='products'>
                    <Text color='gravy' variant='mediumBody' element='span'>
                      {localizedDictionary.endyProduct}
                    </Text>
                  </label>

                  {Array.isArray(productDropdown) ? (
                    <Dropdown
                      options={[
                        {
                          id: '',
                          label: localizedDictionary.chooseAnEndyProduct,
                          slug: ''
                        },
                        ...productDropdown
                      ]}
                      variant='white'
                      handleClick={(option) => {
                        if (productTooltipErrorMessage) {
                          setProductTooltipErrorMessage('')
                        }
                        handleProductSelection(option)
                      }}
                      handleChange={(option) => {
                        if (productTooltipErrorMessage) {
                          setProductTooltipErrorMessage('')
                        }
                        handleProductSelection(option)
                      }}
                      isReviewForm={true}
                    />
                  ) : (
                    <input
                      type='text'
                      value={productDropdown?.label}
                      readOnly
                    />
                  )}

                  <InputTooltip
                    showTooltip={!!productTooltipErrorMessage}
                    top='85px'
                    left='15px'
                  >
                    {/*TODO: update icon to  Icon component when it is ready*/}
                    <img
                      src='https://cdn.sanity.io/images/d0kd7r9c/production/fb78171c375736e72d30ed09fa10488a4eb24331-20x20.svg'
                      alt=''
                    />
                    <StyledErrorMessageSpan>
                      <strong>{productTooltipErrorMessage}</strong>
                    </StyledErrorMessageSpan>
                  </InputTooltip>
                </StyledInputContainer>

                <TextInput
                  dictionaryString={`${localizedDictionary.email}`}
                  placeholderText={localizedDictionary.enterYourEmail}
                  errorMessage={emailTooltipErrorMessage}
                  setErrorMessage={setEmailTooltipErrorMessage}
                  label='email'
                  val={customerEmail}
                  setVal={setCustomerEmail}
                />
              </StyledRow>
              <StyledRow>
                <TextInput
                  dictionaryString={`${localizedDictionary.title}`}
                  placeholderText={localizedDictionary.giveReviewTitle}
                  errorMessage={titleTooltipErrorMessage}
                  setErrorMessage={setTitleTooltipErrorMessage}
                  label='title'
                  register={register('review_title')}
                />
              </StyledRow>
              <StyledRow>
                <TextInput
                  dictionaryString={`${localizedDictionary.review}`}
                  placeholderText={localizedDictionary.howWasYourExperience}
                  errorMessage={reviewTooltipErrorMessage}
                  setErrorMessage={setReviewTooltipErrorMessage}
                  label='review'
                  register={register('review_content')}
                  count={count}
                  setCount={setCount}
                />
              </StyledRow>

              <StyledRow>
                <TextInput
                  dictionaryString={`${localizedDictionary.name}`}
                  placeholderText={localizedDictionary.enterYourName}
                  errorMessage={nameTooltipErrorMessage}
                  setErrorMessage={setNameTooltipErrorMessage}
                  label='name'
                  val={name}
                  setVal={setName}
                />

                <StyledInputContainer>
                  <label htmlFor='location'>
                    <Text color='gravy' variant='mediumBody' element='span'>
                      {localizedDictionary.location}{' '}
                    </Text>
                  </label>
                  <input
                    type='text'
                    id='location'
                    placeholder={localizedDictionary.totallyOptionalLocation}
                    {...register('customer_metadata.state')}
                  />
                </StyledInputContainer>
              </StyledRow>

              <StyledSleeperContainer>
                <StyledSleeperSubheading
                  color='gravy'
                  variant='mediumBody'
                  element='p'
                >
                  {localizedDictionary.whatKindOfSleeper}
                </StyledSleeperSubheading>

                <RadioInput
                  label={localizedDictionary.sideSleeper}
                  id={'sideSleeper'}
                  register={register('custom_properties.sleeping_position')}
                />

                <RadioInput
                  label={localizedDictionary.backSleeper}
                  id={'backSleeper'}
                  register={register('custom_properties.sleeping_position')}
                />

                <RadioInput
                  label={localizedDictionary.stomachSleeper}
                  id={'stomachSleeper'}
                  register={register('custom_properties.sleeping_position')}
                />

                <RadioInput
                  label={localizedDictionary.noPreference}
                  id={'noPreference'}
                  register={register('custom_properties.sleeping_position')}
                />
              </StyledSleeperContainer>

              <StyledServerErrorMessage>
                {serverErrorMessage}
              </StyledServerErrorMessage>
              <StyledButtonContainer>
                <StyledSubmitButton variant='solid-gravy' type='submit'>
                  {buttonMessage}
                </StyledSubmitButton>
              </StyledButtonContainer>
            </StyledForm>
          </StyledMotionDiv>
        )}
      </AnimatePresence>
    </>
  )
}

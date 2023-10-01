'use client';
import { Input } from 'ui/input';
import { Label } from 'ui/label';
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from 'ui/tooltip';
// import {
//   Select,
//   SelectContent,
//   SelectGroup,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from 'ui/select';
import Select from 'react-select';
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useForm, SubmitHandler } from 'react-hook-form';
import checkoutService from '@/core/modules/checkout/service';

type User = {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  address2: string;
  city: string;
  province: string;
  zip: string;
  phone: string;
};

export default function InformationForm() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<User>();
  const [tooltipPhoneNumber, setTooltipPhoneNumber] = useState(false);
  const countries = useQuery({
    queryKey: ['countries'],
    queryFn: async () => {
      try {
        const data: any = await checkoutService.getCountries();
        if (!data) return [];
        const result = data.map((item: any) => ({
          ...item,
          label: item.name,
          value: item.code,
        }));
        return result;
      } catch (error) {
        console.log(
          '🚀 ~ file: information-form.tsx:29 ~ queryFn: ~ error:',
          error
        );
        return null;
      }
    },
    initialData: [],
  });
  const onSubmit: SubmitHandler<User> = (data) => {
    console.log(data);
  };
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <h4 className='mb-2'>Contact information</h4>
      <div className='mb-4'>
        <Label htmlFor='email' className='mb-2 inline-block font-medium'>
          Email address
        </Label>
        <Input
          type='email'
          placeholder='Email'
          className='h-12'
          {...register('email', { required: true })}
        />
        <p className='mt-1 text-xs text-destructive'>
          <i className='fal fa-exclamation-circle'></i> Please enter your email
        </p>
      </div>
      <h4 className='mb-3'>Shipping address</h4>
      <div className='mb-4 grid grid-cols-2 gap-3'>
        <div className='col-span-2 sm:col-span-1'>
          <Label htmlFor='firstName' className='mb-2 inline-block font-medium'>
            {'First name (optional)'}
          </Label>
          <Input name='firstName' placeholder='First name' className='h-12' />
          <p className='mt-1 text-xs text-destructive'>
            <i className='fal fa-exclamation-circle'></i> Please enter your
            first name
          </p>
        </div>
        <div className='col-span-2 sm:col-span-1'>
          <Label htmlFor='lastName' className='mb-2 inline-block font-medium'>
            Last name
          </Label>
          <Input
            placeholder='Last name'
            className='h-12'
            {...register('lastName', { required: true })}
          />
          <p className='mt-1 text-xs text-destructive'>
            <i className='fal fa-exclamation-circle'></i> Please enter your last
            name
          </p>
        </div>
        <div className='col-span-2'>
          <Label htmlFor='address' className='mb-2 inline-block font-medium'>
            Address
          </Label>
          <Input
            placeholder='Address'
            className='h-12'
            {...register('address', { required: true })}
          />
          <p className='mt-1 text-xs text-destructive'>
            <i className='fal fa-exclamation-circle'></i> Please enter your
            address
          </p>
        </div>
        <div className='col-span-2'>
          <Label htmlFor='address2' className='mb-2 inline-block font-medium'>
            Apartment, suite, etc.
          </Label>
          <Input
            name='address2'
            placeholder='Apartment, suite, etc.'
            className='h-12'
          />
        </div>
        <div>
          <Label htmlFor='city' className='mb-2 inline-block font-medium'>
            City
          </Label>
          <Input
            placeholder='City'
            className='h-12'
            {...register('city', { required: true })}
          />
          <p className='mt-1 text-xs text-destructive'>
            <i className='fal fa-exclamation-circle'></i> Please enter your city
          </p>
        </div>
        <div>
          <Label className='mb-2 inline-block font-medium'>Country</Label>
          <Select
            placeholder='Country'
            options={countries.data}
            styles={{
              control: (styles) => ({
                ...styles,
                height: 48,
                borderColor: 'hsl(20,5.9%,90%)',
              }),
            }}
          />
          {/* <Select>
            <SelectTrigger className='h-12'>
              <SelectValue placeholder='Country' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup className='max-h-52 overflow-y-auto'>
                {!countries.isLoading &&
                  countries.data?.map((country: any, key: number) => (
                    <SelectItem key={key} value={country.code}>
                      {country.name}
                    </SelectItem>
                  ))}
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <div className='col-span-2 sm:col-span-1'>
          <Label className='mb-2 inline-block font-medium'>
            State / Province
          </Label>
          {/* <Select>
            <SelectTrigger className='h-12'>
              <SelectValue placeholder='State / Province' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='vn'>Vietnamese</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select> */}
        </div>
        <div className='col-span-2 sm:col-span-1'>
          <Label htmlFor='zip' className='mb-2 inline-block font-medium'>
            Zip code
          </Label>
          <Input
            placeholder='Zip code'
            className='h-12'
            {...register('zip', { required: true })}
          />
          <p className='mt-1 text-xs text-destructive'>
            <i className='fal fa-exclamation-circle'></i> Please enter a valid
            Zip/Postal code.
          </p>
        </div>
        <div className='relative col-span-2'>
          <Label htmlFor='phone' className='mb-2 inline-block font-medium'>
            Phone
          </Label>
          <Input
            placeholder='Phone number'
            className='h-12 pr-10'
            {...register('phone', { required: true })}
          />
          <TooltipProvider>
            <Tooltip
              open={tooltipPhoneNumber}
              onOpenChange={setTooltipPhoneNumber}
            >
              <TooltipTrigger
                asChild
                onClick={() => setTooltipPhoneNumber(!tooltipPhoneNumber)}
              >
                <i className='fal fa-question-circle fa-lg absolute right-3 top-[55%] -translate-y-1/2 cursor-pointer text-gray-400'></i>
              </TooltipTrigger>
              <TooltipContent>
                <p>In case we need to contact you about your order</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
          <p className='mt-1 text-xs text-destructive'>
            <i className='fal fa-exclamation-circle'></i> Please enter your
            phone number
          </p>
        </div>
      </div>
    </form>
  );
}

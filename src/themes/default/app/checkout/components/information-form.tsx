'use client';
import { Input } from '@/core/components/ui/input';
import { Label } from '@/core/components/ui/label';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/core/components/ui/select';
export default function InformationForm() {
  return (
    <form action={'#'}>
      <h4 className='mb-4 font-medium'>Contact information</h4>
      <div className='mb-4'>
        <Label htmlFor='email' className='mb-2 inline-block font-normal'>
          Email address
        </Label>
        <Input name='email' type='email' placeholder='Email' className='mb-4' />
      </div>
      <h4 className='mb-4 font-medium'>Shipping address</h4>
      <div className='mb-4 grid grid-cols-2 gap-4'>
        <div>
          <Label htmlFor='firstName' className='mb-2 inline-block font-normal'>
            {'First name (optional)'}
          </Label>
          <Input name='firstName' placeholder='First name' />
        </div>
        <div>
          <Label htmlFor='lastName' className='mb-2 inline-block font-normal'>
            Last name
          </Label>
          <Input name='lastName' placeholder='Last name' />
        </div>
        <div className='col-span-2'>
          <Label htmlFor='address' className='mb-2 inline-block font-normal'>
            Address
          </Label>
          <Input name='address' placeholder='Address' />
        </div>
        <div className='col-span-2'>
          <Label htmlFor='address2' className='mb-2 inline-block font-normal'>
            Apartment, suite, etc.
          </Label>
          <Input name='address2' placeholder='Apartment, suite, etc.' />
        </div>
        <div>
          <Label htmlFor='city' className='mb-2 inline-block font-normal'>
            City
          </Label>
          <Input name='city' placeholder='City' />
        </div>
        <div>
          <Label className='mb-2 inline-block font-normal'>Country</Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='Country' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='vn'>Viet Nam</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label className='mb-2 inline-block font-normal'>
            State / Province
          </Label>
          <Select>
            <SelectTrigger>
              <SelectValue placeholder='State / Province' />
            </SelectTrigger>
            <SelectContent>
              <SelectGroup>
                <SelectItem value='vn'>Vietnamese</SelectItem>
              </SelectGroup>
            </SelectContent>
          </Select>
        </div>
        <div>
          <Label htmlFor='zip' className='mb-2 inline-block font-normal'>
            Zip code
          </Label>
          <Input name='zip' placeholder='Zip code' />
        </div>
        <div className='col-span-2'>
          <Label htmlFor='phone' className='mb-2 inline-block font-normal'>
            Phone
          </Label>
          <Input name='phone' placeholder='Phone number' />
        </div>
      </div>
    </form>
  );
}

'use client';
import { useRef } from 'react';
import { Label } from '@/core/components/ui/label';
import { Input } from '@/core/components/ui/input';
import { Textarea } from '@/core/components/ui/textarea';
import { Button } from '@/core/components/ui/button';
import {
  Alert,
  AlertDescription,
  AlertTitle,
} from '@/core/components/ui/alert';
import { cn } from '@/core/lib/utils';
import { useForm, SubmitHandler } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import pagesService from '@/core/modules/pages/service';
import styles from '../styles/styles.module.scss';

type Props = {
  pageData: any;
};
type ContactForm = {
  order_number: string;
  mail: string;
  message: string;
};
export default function ContactUs({ pageData }: Props) {
  const formRef = useRef<HTMLFormElement>(null);
  const { register, handleSubmit } = useForm<ContactForm>();
  const { mutate, isLoading, isSuccess } = useMutation({
    mutationFn(data: ContactForm) {
      return pagesService.sendContactUs(data);
    },
    onSuccess() {
      formRef.current?.reset();
    },
  });
  const onSubmit: SubmitHandler<ContactForm> = (form) => {
    mutate(form);
  };
  return (
    <article className='container min-h-full py-10'>
      {pageData.isShowTitle && (
        <h1 className='mb-4 lg:mb-10'>{pageData.title}</h1>
      )}

      <div className='grid grid-cols-1 gap-4 lg:grid-cols-2 lg:gap-12'>
        <form
          className='lg:order-0 order-1'
          ref={formRef}
          onSubmit={handleSubmit(onSubmit)}
        >
          {isSuccess && (
            <Alert className='mb-4'>
              <AlertTitle>
                <i className='fas fa-check mr-2 text-[#28a745]'></i>
                Success!
              </AlertTitle>
              <AlertDescription>
                {`Thanks for contacting us. We'll get back to you as soon as
                possible.`}
              </AlertDescription>
            </Alert>
          )}

          <div className='mb-4'>
            <Label
              htmlFor='orderNumber'
              className='mb-2 inline-block font-bold'
            >
              Order Number #
            </Label>
            <Input
              id='orderNumber'
              className={styles.contactInput}
              {...register('order_number')}
              placeholder='Ex: #2099'
              required
            />
          </div>
          <div className='mb-4'>
            <Label htmlFor='email' className='mb-2 inline-block font-bold'>
              Email
            </Label>
            <Input
              id='email'
              type='email'
              className={styles.contactInput}
              {...register('mail')}
              placeholder='Enter your email'
              required
            />
          </div>
          <div className='mb-6'>
            <Label htmlFor='message' className='mb-2 inline-block font-bold'>
              Message
            </Label>
            <Textarea
              id='message'
              {...register('message')}
              className='hover:border-b-info focus:border-b-info focus-visible:border-b-info rounded-none border-b border-l-0 border-r-0 border-t-0 px-0'
              placeholder='Start to typing here'
              rows={6}
              required
            />
          </div>
          <div className='sm:flex sm:justify-end'>
            <Button
              type='submit'
              className='h-12 w-full sm:w-[unset] sm:px-8'
              disabled={isLoading}
            >
              {isLoading && (
                <i className='fas fa-spinner-third mr-2 animate-spin'></i>
              )}
              Submit
            </Button>
          </div>
        </form>
        <div
          dangerouslySetInnerHTML={{ __html: pageData.bodyHtml }}
          className={cn('order-0 lg:order-1', styles.pageBody)}
        ></div>
      </div>
    </article>
  );
}

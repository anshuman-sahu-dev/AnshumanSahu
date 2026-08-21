import React from 'react';
import { SectionHeading } from '../UI/SectionHeading';
import { TestimonialCard } from '../cards/TestimonialCard';
import { testimonialsData } from '../../data/portfolioData';

export const Testimonials = () => {
  return (
    <section id="testimonials" className="border-b-3 border-ink py-[90px]">
      <div className="wrap">
        <SectionHeading 
          titleLines={["Words", "of Trust"]} 
          subtitle="what people say ↓" 
        />
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[30px]">
          {testimonialsData.map((testimonial, index) => (
            <TestimonialCard key={testimonial.id} testimonial={testimonial} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

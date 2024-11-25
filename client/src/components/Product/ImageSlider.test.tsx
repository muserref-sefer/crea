import '@testing-library/jest-dom';
import { fireEvent, render, screen } from '@testing-library/react';
import ImageSlider from './ImageSlider';

describe('ImageSlider Component', () => {
  const images = [
    'https://fakeimg.pl/400x300?text=Image+1',
    'https://fakeimg.pl/400x300?text=Image+2',
    'https://fakeimg.pl/400x300?text=Image+3',
  ];

  it('renders the first image by default', () => {
    render(<ImageSlider images={images} />);
    const image = screen.getByAltText('Slide 0');
    expect(image).toHaveAttribute('src', images[0]);
  });

  it('navigates to the next image when the "Next" button is clicked', () => {
    render(<ImageSlider images={images} />);
    const nextButton = screen.getByText('›');
    fireEvent.click(nextButton);

    const image = screen.getByAltText('Slide 1');
    expect(image).toHaveAttribute('src', images[1]);
  });

  it('navigates to the previous image when the "Previous" button is clicked', () => {
    render(<ImageSlider images={images} />);
    const nextButton = screen.getByText('›');
    const prevButton = screen.getByText('‹');

    fireEvent.click(nextButton);
    fireEvent.click(prevButton);

    const image = screen.getByAltText('Slide 0');
    expect(image).toHaveAttribute('src', images[0]);
  });

  it('loops to the last image when "Previous" is clicked on the first image', () => {
    render(<ImageSlider images={images} />);
    const prevButton = screen.getByText('‹');
    fireEvent.click(prevButton);

    const image = screen.getByAltText(`Slide ${images.length - 1}`);
    expect(image).toHaveAttribute('src', images[images.length - 1]);
  });

  it('loops to the first image when "Next" is clicked on the last image', () => {
    render(<ImageSlider images={images} />);
    const nextButton = screen.getByText('›');

    for (let i = 0; i < images.length; i++) {
      fireEvent.click(nextButton);
    }

    const image = screen.getByAltText('Slide 0');
    expect(image).toHaveAttribute('src', images[0]);
  });

  it('renders indicators correctly and highlights the active one', () => {
    render(<ImageSlider images={images} />);

    const indicators = screen.getAllByRole('presentation');
    expect(indicators).toHaveLength(images.length);

    expect(indicators[0]).toHaveClass('bg-blue-500');
    expect(indicators[1]).toHaveClass('bg-gray-300');

    fireEvent.click(screen.getByText('›'));

    expect(indicators[1]).toHaveClass('bg-blue-500');
    expect(indicators[0]).toHaveClass('bg-gray-300');
  });
});
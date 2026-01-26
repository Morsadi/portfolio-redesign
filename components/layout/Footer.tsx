export default function Footer() {
	const year = new Date().getFullYear();

	return (
		<footer>
			<div className='footer-inner'>
				<div className='footer-copy'>© {year} Badr Morsadi</div>

				<div className='footer-social'>
					<a
						href='https://www.linkedin.com/in/bmorsadi/'
						target='_blank'
						rel='noreferrer'>
						LinkedIn
					</a>

					<a
						href='https://github.com/Morsadi'
						target='_blank'
						rel='noreferrer'>
						GitHub
					</a>

					<a
						href='/Badr-Morsadi-Resume.pdf'
						target='_blank'
						rel='noreferrer'>
						Resume
					</a>
				</div>
			</div>
		</footer>
	);
}

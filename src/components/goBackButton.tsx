'use client';
import { useRouter } from 'next/navigation';
import { ArrowLeft } from 'lucide-react';

export default function GoBackButton() {
	const router = useRouter();

	return (
		<button onClick={() => router.back()} className="goBackSection">
			<ArrowLeft size={23} />
			<p style={{ fontWeight: 600, fontSize: 'x-large' }}>GO BACK</p>
		</button>
	);
}

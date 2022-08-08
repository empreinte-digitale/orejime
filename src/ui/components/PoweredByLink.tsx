import React from 'react';
import {useTranslations} from '../utils/hooks';

interface PoweredByLinkProps {
	className?: string;
}

const PoweredByLink = ({className}: PoweredByLinkProps) => {
	const t = useTranslations();

	return (
		<a
			className={className}
			title={`${t.misc.poweredBy} (${t.misc.newWindowTitle})`}
			href="https://orejime.empreintedigitale.fr"
			target="_blank"
		>
			{t.misc.poweredBy}
		</a>
	);
};

export default PoweredByLink;

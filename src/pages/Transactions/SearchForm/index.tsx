import { MagnifyingGlass } from "@phosphor-icons/react";
import { SearchFormContainer } from "./styles";
import { useForm } from "react-hook-form";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { TransactionsContext } from "../../../contexts/TransactionsContext";
import { useContextSelector } from "use-context-selector";
import { memo } from "react";

const searchFormSchema = zod.object({
	query: zod.string(),
});

type SearchFormInputs = zod.infer<typeof searchFormSchema>;

function SearchFormComponent() {
	const fetchTransactions = useContextSelector(
		TransactionsContext,
		(context) => context.fetchTransactions
	);

	const {
		register,
		handleSubmit,
		formState: { isSubmitting },
	} = useForm<SearchFormInputs>({
		resolver: zodResolver(searchFormSchema),
	});

	async function handleSearchTransactions(data: SearchFormInputs) {
		await fetchTransactions(data.query);
	}

	return (
		<SearchFormContainer onSubmit={handleSubmit(handleSearchTransactions)}>
			<input type="text" placeholder="Busque por transações" {...register("query")} />
			<button type="submit" disabled={isSubmitting}>
				<MagnifyingGlass size={20} />
				Buscar
			</button>
		</SearchFormContainer>
	);
}

/* Por quê que um componente renderiza?
	Hooks changed (mudou estado, contexto, reducer)
	Props changed (mudou propriedades)
	Parent rerendered (componente pai renderizou)
*/

/* Qual o fluxo de renderização? 
	1. O React recria o HTML da interface daquele componente
	2. Compara a versão do HTML recriada com a versão anterior
	3. Se mudou alguma coisa, ele reescreve o HTML na tela
*/

/* Memo
	0. Hooks changed, Props changed (deep comparison);
	0.1 Comparar versão anterior dos hooks e props;
	0.2 Se mudou, permite a nova renderização;
	(pode ser menos performático quando não há muita estrutura para renderizar)
*/

export const SearchForm = memo(SearchFormComponent);

<?php

namespace App\Doctrine;


use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;


use Doctrine\ORM\QueryBuilder;
use ApiPlatform\Metadata\Operation;
use ApiPlatform\Doctrine\Orm\Util\QueryNameGeneratorInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryItemExtensionInterface;
use ApiPlatform\Doctrine\Orm\Extension\QueryCollectionExtensionInterface;
use Symfony\Component\Security\Core\Authorization\AuthorizationCheckerInterface;
use Symfony\Component\Security\Core\Authentication\Token\Storage\TokenStorageInterface;

class CurrentUserExtension implements QueryCollectionExtensionInterface, QueryItemExtensionInterface
{

    private $tokenStorage;
    private $auth;

    /**
     * Constructs a new instance of the class.
     *
     * @param TokenStorageInterface $tokenStorage The token storage interface.
     * @param AuthorizationCheckerInterface $checker The authorization checker interface.
     */
    public function __construct(TokenStorageInterface $tokenStorage, AuthorizationCheckerInterface $checker)
    {
        $this->tokenStorage = $tokenStorage;
        $this->auth = $checker;
    }

    /**
     * Adds a WHERE clause to the given query builder based on the resource class and user's role.
     *
     * @param QueryBuilder $queryBuilder The query builder object.
     * @param string $resourceClass The class name of the resource.
     */
    private function addWhere(QueryBuilder $queryBuilder, string $resourceClass)
    {
        $user = $this->tokenStorage->getToken()->getUser();

        if (($resourceClass === Customer::class || $resourceClass === Invoice::class)
            &&
            !$this->auth->isGranted('ROLE_ADMIN')
            &&
            $user instanceof User
        ) {
            $rootAlias = $queryBuilder->getRootAliases()[0];

            if ($resourceClass === Customer::class) {
                $queryBuilder->andWhere("$rootAlias.user = :user");
            } else if ($resourceClass === Invoice::class) {
                $queryBuilder->join("$rootAlias.customer", "c")
                    ->andWhere("c.user= :user");
            }

            $queryBuilder->setParameter("user", $user);
        }
    }

    /**
     * Apply the query builder to a collection.
     *
     * @param QueryBuilder $queryBuilder The query builder object.
     * @param QueryNameGeneratorInterface $queryNameGenerator The query name generator object.
     * @param string $resourceClass The resource class.
     * @param Operation|null $operation The operation object. (optional)
     * @param array $context The context array. (optional)
     * @throws Some_Exception_Class Description of exception
     * @return void
     */
    public function applyToCollection(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        Operation $operation = null,
        array $context = []
    ): void {
        $this->addWhere($queryBuilder, $resourceClass);
    }

    /**
     * Apply the given parameters to the specified item.
     *
     * @param QueryBuilder $queryBuilder The query builder to apply the parameters to.
     * @param QueryNameGeneratorInterface $queryNameGenerator The query name generator.
     * @param string $resourceClass The resource class.
     * @param array $identifiers The identifiers.
     * @param Operation|null $operation The operation.
     * @param array $context The context.
     * @throws Some_Exception_Class A description of the exception.
     * @return void
     */
    public function applyToItem(
        QueryBuilder $queryBuilder,
        QueryNameGeneratorInterface $queryNameGenerator,
        string $resourceClass,
        array $identifiers,
        Operation $operation = null,
        array $context = []
    ): void {
        $this->addWhere($queryBuilder, $resourceClass);
    }
}

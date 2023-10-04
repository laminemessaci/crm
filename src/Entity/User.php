<?php

namespace App\Entity;

use Symfony\Component\Validator\Constraints as Assert;

use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;

use Doctrine\ORM\Mapping as ORM;
use App\Repository\UserRepository;
use ApiPlatform\Metadata\ApiResource;
use Doctrine\Common\Collections\Collection;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\DBAL\Types\Types;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ApiResource(
    normalizationContext: ['groups' => ['users_read']],
)]
#[UniqueEntity('email', message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["customers_read", "invoices_read", "users_read"])]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Groups(["customers_read", "invoices_read", "users_read"])]
    #[Assert\NotBlank]
    #[Assert\Email(message: "The email '{{ value }}' is not a valid email.")]
    private ?string $email = null;

    #[ORM\Column]
    #[Groups(["users_read"])]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\NotBlank(message: 'Please enter a password')]
    #[Assert\Length(min: 5, max: 20, minMessage: 'Your password must be at least {{ limit }} characters', maxMessage: 'Your password cannot be longer than {{ limit }} characters')]
    private ?string $password = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read", "invoices_read", "users_read"])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 50)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read", "invoices_read", "users_read"])]
    #[Assert\NotBlank]
    #[Assert\Length(min: 2, max: 50)]
    private ?string $lastName = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Customer::class)]
    private Collection $customers;



    public function __construct()
    {
        $this->customers = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUsername(): string
    {
        return (string) $this->getUserIdentifier();
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): self
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }



    public function setPassword(string $password): self
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

    public function getFirstName(): ?string
    {
        return $this->firstName;
    }

    public function setFirstName(string $firstName): self
    {
        $this->firstName = $firstName;

        return $this;
    }

    public function getLastName(): ?string
    {
        return $this->lastName;
    }

    public function setLastName(string $lastName): self
    {
        $this->lastName = $lastName;

        return $this;
    }

    /**
     * @return Collection<int, Customer>
     */

    public function getCustomers(): Collection
    {
        return $this->customers;
    }


    /**
     * Adds a customer to the user's list of customers and sets the user as the customer's user.
     *
     * @param Customer $customer The customer to be added.
     * @return self The updated user object.
     */
    public function addCustomer(Customer $customer): self
    {
        if (!$this->customers->contains($customer)) {
            $this->customers->add($customer);
            $customer->setUser($this);
        }

        return $this;
    }

    #[Groups(["users_read"])]
    public function getCustomersCount(): int
    {
        return $this->getCustomers()->count();
    }

    // public function getUnpaidAmount(): float
    // {
    //     $total =  array_reduce($this->customers->toArray(), function ($total, $customer) {
    //         return $total + $customer->getUnpaidAmount();
    //     }, 0);

    //     $total = $total - $this->getTotalTransactions();
    //     return $total;
    // }



    #[Groups(["users_read"])]
    public function getTotalTransactions(): float
    {
        $total = 0;

        foreach ($this->customers as $customer) {
            $total += $customer->getTotalAmount();
        }

        return $total;
    }


    public function removeCustomer(Customer $customer): self
    {
        if ($this->customers->removeElement($customer)) {
            // set the owning side to null (unless already changed)
            if ($customer->getUser() === $this) {
                $customer->setUser(null);
            }
        }

        return $this;
    }
}

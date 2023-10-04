<?php

namespace App\Entity;

use App\Entity\Invoice;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\Put;
use ApiPlatform\Metadata\Post;
use ApiPlatform\Metadata\Patch;
use ApiPlatform\Metadata\Delete;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\ApiFilter;
use ApiPlatform\Metadata\ApiResource;
use App\Repository\CustomerRepository;
use ApiPlatform\Metadata\GetCollection;
use Doctrine\Common\Collections\Collection;
use ApiPlatform\Doctrine\Orm\Filter\OrderFilter;
use Doctrine\Common\Collections\ArrayCollection;
use ApiPlatform\Doctrine\Orm\Filter\SearchFilter;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: CustomerRepository::class)]
#[ApiResource(
    operations: [
        new Get(),
        new Put(),
        new Patch(),
        new Delete(),
        new GetCollection(),
        new Post(),
        ],
        paginationClientPartial: true,
        normalizationContext: ['groups' => ['customers_read']],
)]
#[ApiFilter(SearchFilter::class, properties: ['firstName' => 'word_start', 'lastName' => 'word_start', 'company' => 'partial'])]
#[ApiFilter(OrderFilter::class)]
class Customer
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    #[Groups(["customers_read", "invoices_read"])]
    private ?int $id = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read", "invoices_read"])]
    #[Assert\NotBlank(message:"First name is required")]
    #[Assert\Length(min: 2, max: 255)]
    private ?string $firstName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read", "invoices_read"])]
    #[Assert\NotBlank(message:"Last name is required")]
    #[Assert\Length(min: 2, max: 255)]
    private ?string $lastName = null;

    #[ORM\Column(length: 255)]
    #[Groups(["customers_read", "invoices_read"])]
    #[Assert\NotBlank(message:"Email is required")]
    #[Assert\Email]
    private ?string $email = null;

    #[ORM\Column(length: 255, nullable: true)]
    #[Groups(["customers_read", "invoices_read"])]
    private ?string $company = null;

    #[ORM\OneToMany(mappedBy: 'customer', targetEntity: Invoice::class)]
    #[Groups(["customers_read"])]
    private Collection $invoices;

    #[ORM\ManyToOne(inversedBy: 'customers')]
    #[Groups(["customers_read"])]
    #[Assert\NotBlank(message:"User is required")]
    private ?User $user = null;

    public function __construct()
    {
        $this->invoices = new ArrayCollection();
    }

     /**
    * Calculates the total amount of the invoices.
    *
    * @return float The total amount of the invoices.
    */
    #[Groups(["customers_read"])]
   public function getTotalAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + $invoice->getAmount();
        }, 0);
    }


     /**
      * Calculates the unpaid amount for the given invoices.
      *
      * @return float The total unpaid amount.
      */
      #[Groups(["customers_read"])]
     public function getUnpaidAmount(): float
    {
        return array_reduce($this->invoices->toArray(), function ($total, $invoice) {
            return $total + ($invoice->getStatus() === 'SENT' ?  $invoice->getAmount() : 0);
        }, 0);
    }




    public function getId(): ?int
    {
        return $this->id;
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

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): self
    {
        $this->email = $email;

        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): self
    {
        $this->company = $company;

        return $this;
    }

    /**
     * @return Collection<int, Invoice>
     */
    public function getInvoices(): Collection
    {
        return $this->invoices;
    }

    public function addInvoice(Invoice $invoice): self
    {
        if (!$this->invoices->contains($invoice)) {
            $this->invoices->add($invoice);
            $invoice->setCustomer($this);
        }

        return $this;
    }

    public function removeInvoice(Invoice $invoice): self
    {
        if ($this->invoices->removeElement($invoice)) {
            // set the owning side to null (unless already changed)
            if ($invoice->getCustomer() === $this) {
                $invoice->setCustomer(null);
            }
        }

        return $this;
    }

    public function getUser(): ?User
    {
        return $this->user;
    }

    public function setUser(?User $user): self
    {
        $this->user = $user;

        return $this;
    }
}

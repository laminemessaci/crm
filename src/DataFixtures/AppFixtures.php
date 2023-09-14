<?php

namespace App\DataFixtures;

use Faker\Factory;
use App\Entity\User;
use App\Entity\Invoice;
use App\Entity\Customer;
use Doctrine\Persistence\ObjectManager;
use Doctrine\Bundle\FixturesBundle\Fixture;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;


class AppFixtures extends Fixture
{
    /**
     * Undocumented variable
     *
     * @var UserHashedPasswordInterface
     */
    private $hashedPassword;

    public function __construct(UserPasswordHasherInterface $hashedPassword)
    {
        $this->hashedPassword = $hashedPassword;
    }
    public function load(ObjectManager $manager): void
    {
        $faker = Factory::create('fr_FR');
        for ($u = 0; $u < 10; $u++) {

            $user = new User();
            $chrono = 1;
            $user->setFirstName($faker->firstName());
            $user->setLastName($faker->lastName());
            $user->setEmail($faker->email());
            $user->setPassword($this->hashedPassword->hashPassword($user, 'password'));

            $manager->persist($user);

            for ($i = 0; $i < mt_rand(5, 20); $i++) {
                $customer = new Customer();
                $customer->setFirstName($faker->firstName());
                $customer->setLastName($faker->lastName());
                $customer->setEmail($faker->email());
                $customer->setCompany($faker->company());
                $customer->setUser($user);
                $manager->persist($customer);

                for ($j = 0; $j < mt_rand(3, 10); $j++) {
                    // $dateTimeImmutable = DateTimeImmutable::createFromMutable($faker->dateTimeBetween('-6 months'));
                    $invoice = new Invoice();
                    $invoice->setAmount($faker->randomFloat(2, 250, 5000));
                    $invoice->setSentAt($faker->dateTimeBetween('-6 months'));
                    $invoice->setStatus($faker->randomElement(['SENT', 'PAID', 'CANCELLED']));
                    $invoice->setCustomer($customer);
                    $invoice->setChrono($chrono);

                    $chrono++;
                    $manager->persist($invoice);
                }

                $manager->flush();
            }
        }
    }
}
